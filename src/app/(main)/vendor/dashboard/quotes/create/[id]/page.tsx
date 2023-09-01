"use client";
import { FC, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  createQuote,
  getFormData,
  getRequestQuote,
} from "@/lib/api/vendor.api";
import { formattedMoney, removeEmptyValues } from "@/lib/utils";
import { NotificationManager } from "react-notifications";
import useSWR from "swr";
import * as Yup from "yup";
import Button from "@/components/Button";
import { Loading } from "@/components/icons";

interface PageProps {
  params: { id: string };
}

const QuotesPage: FC<PageProps> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState(null);
  const router = useRouter();
  const { data, error, isLoading } = useSWR(`${params.id}`, getRequestQuote);

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      amount: "",
      expiredAt: "",
    },
    onSubmit: async (data) => {
      let userData: any = { ...data };

      userData.requestId = params.id;

      setLoading(true);
      let formData = new FormData();

      userData = removeEmptyValues(userData);

      for (var key in userData) {
        formData.append(key, userData[key]);
      }

      if (file) {
        formData.append("doc", file);
      }

      try {
        const res = await createQuote(formData);
        NotificationManager.success("Quote successfully created!");

        // router.push("/account/my-requests");
      } catch (error: any) {
        if (error?.response?.status == 400) {
          const err = error?.response?.data;
          NotificationManager.error(
            err?.msg || err?.error.errors[0].message,
            "Error message"
          );
        } else {
          NotificationManager.error("Error message", "Something went wrong");
        }
      } finally {
        router.refresh();
        setLoading(false);
      }
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number().min(10).required("Amount is required"),
    }),
  });

  return (
    <section>
      <div className="header">
        <h4 className="text-xl font-black">Submit quote</h4>
      </div>

      <div className="w-full sm:w-1/2">
        {isLoading ? (
          <Loading />
        ) : data.quote ? (
          <div className="p-3 bg-white shadow my-4">
            <h4>{data.quote.request.title}</h4>
            <h4>{formattedMoney(data.quote.amount)}</h4>
          </div>
        ) : (
          <>
            <form onSubmit={formik.handleSubmit}>
              <div className="field">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                  placeholder="Amount"
                  type="number"
                  name="amount"
                />
                {formik.touched && formik.errors.amount && (
                  <span className="error">{formik.errors.amount}</span>
                )}
              </div>
              <div className="field textarea h-[100px]">
                {/* <label>Description</label> */}
                <textarea
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  name="description"
                  placeholder="Description "
                  rows={3}
                ></textarea>
              </div>

              <div className="field ">
                <label>Offer deadline</label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.expiredAt}
                  type="datetime-local"
                  name="expiredAt"
                />
              </div>

              <div className="field">
                <label htmlFor="Doc">Attach Document</label>
                <input
                  type="file"
                  id="doc"
                  placeholder="Attach Doc"
                  onChange={handleChange}
                />
              </div>

              <br />

              <Button
                classNames="em__button primary"
                text="Send Quote"
                loading={loading}
              />
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default QuotesPage;
