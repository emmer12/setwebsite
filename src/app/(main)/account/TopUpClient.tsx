"use client";
import SafModal from "@/components/modal";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { NotificationManager } from "react-notifications";
import * as Yup from "yup";
import Button from "@/components/Button";
import { topUp } from "@/lib/api/user.api";

const TopUpClient = () => {
  const { status, data: session, update } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Polling the session every 1 hour
  useEffect(() => {
    // TIP: You can also use `navigator.onLine` and some extra event handlers
    // to check if the user is online and only update the session if they are.
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
    const interval = setInterval(() => update(), 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, [update]);

  const formik = useFormik({
    initialValues: {
      amount: 0,
      type: "saf",
    },
    onSubmit: async (data) => {
      try {
        setLoading(true);
        const res = await topUp(data);
        formik.resetForm();
        window.location.href = res.redirect_url;
      } catch (err) {
        NotificationManager.error(
          "Opps, something went wrong",
          "Error message"
        );
      } finally {
        setLoading(false);
      }
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number().min(10).required("Amount is required"),
    }),
  });

  return (
    <div>
      <div className=" p-4 bg-red-50 rounded-[18px] rounded-br-[8px] relative h-[160px]">
        <h2 className="text-xl font-bold ">My Points</h2>
        <div className="flex py-4 items-center gap-2">
          Set and Forget:
          <h1 className=" ">
            <span className="text-3xl"> {session?.user?.saf_points}</span>
            <small>pts</small>{" "}
          </h1>
        </div>

        <div className="flex py-0 items-center gap-2">
          Dee Designer:
          <h1 className=" ">
            <span className="text-3xl"> {session?.user?.ai_points}</span>
            <small>pts</small>{" "}
          </h1>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="right-4 bottom-4 absolute em__button sm p-4  rounded-[18px] rounded-br-[8px]"
        >
          Top up
        </button>
      </div>

      <SafModal size="small" open={open} close={() => setOpen(false)}>
        <h2 className="text-[#8b5326] em__fancy__text font-extrabold text-2xl sm:text-5xl">
          Add Account Point
        </h2>

        <form className="w-[70%] m-auto" onSubmit={formik.handleSubmit}>
          <div className="agree__info my-3">
            <div className="form-radio">
              <input
                type="radio"
                className="mx-2"
                value="saf"
                checked
                name="type"
                onChange={(e) => formik.setFieldValue("type", e.target.value)}
                id="saf"
              />
              <label htmlFor="saf">Set and Forget</label>
            </div>
            <div className="form-radio">
              <input
                type="radio"
                className="mx-2"
                value="ai"
                name="type"
                onChange={(e) => formik.setFieldValue("type", e.target.value)}
                id="ai"
              />
              <label htmlFor="ai">Dee Designer</label>
            </div>
          </div>
          <div className="field w-full">
            <input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.amount || ""}
              name="amount"
              placeholder="Enter Amount"
            />
            {formik.touched && formik.errors.amount && (
              <span className="error">{formik.errors.amount}</span>
            )}
          </div>

          <Button
            text="Top up"
            classNames="primary mt-4 w-full"
            loading={loading}
          />
        </form>
      </SafModal>
    </div>
  );
};

export default TopUpClient;
