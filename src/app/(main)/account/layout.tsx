"use client";
import Button from "@/components/Button";
import SafModal from "@/components/modal";
import { Formik, useFormik, Form, FieldArray, Field } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NotificationManager } from "react-notifications";
import { useState } from "react";
import * as Yup from "yup";

const initialValues = {
  users: [
    {
      name: "",
      gender: "",
      location: "",
      relation: "",
      dob: "",
    },
  ],
};

const init = { name: "", gender: "", location: "", relation: "", dob: "" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async (data) => {
      setLoading(true);
      try {
        // const res = await createSafOrder(newD);
      } catch (error: any) {
        if (error?.response?.status == 400) {
          NotificationManager.error(
            "Error message",
            error?.response?.data?.msg
          );
        } else {
          NotificationManager.error("Error message", "Something went wrong");
        }
      } finally {
        setLoading(false);
      }

      setLoading(false);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is Required"),
    }),
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  return (
    <div>
      <div className="h-7 sm:h-32 flex items-center bg-[#ffe3cd]">
        <div className="container">
          <h2 className="text-[#263f61] text-2xl sm:text-3xl text-center">
            Your Work ({session?.user?.name})
          </h2>
        </div>
      </div>

      <div className="bg-white">
        <div className="container">
          <div className="py-12 ">
            <div className="flex gap-5">
              <div className="member-side hidden sm:block">
                <ul>
                  <li className="active">Profile</li>
                  <li onClick={() => setOpen(true)}>Set and Forget</li>
                  <li>Developed designs</li>
                  <li>Upgrade to DEE Ultra </li>
                  <li>Guide</li>
                </ul>
              </div>
              <div className="body flex-1">{children}</div>
            </div>
          </div>
        </div>
      </div>

      <SafModal open={open} close={() => setOpen(false)}>
        <div className="flex gap-5">
          <div className="w-1/2 flex-1">
            <div className="em__header_2">
              <h1>Set &</h1>
              <span className="em__fancy__text">Forget</span>
            </div>

            <div>
              <p>
                Stay ahead of the game by registering your friends and
                family&#39;s birthdays, simply fill in the details, and let us
                take care of the rest. Receive personalized designs and birthday
                ideas notifications well in advance of their special day,
                ensuring a memorable and delightful celebration.
              </p>
            </div>
          </div>
          <div className="w-1/2 flex-1 overflow-y-auto saf_form">
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                await new Promise((r) => setTimeout(r, 500));
                alert(JSON.stringify(values, null, 2));
              }}
            >
              {({ values }) => (
                <Form>
                  <FieldArray name="users">
                    {({ insert, remove, push }) => (
                      <div>
                        <div>
                          {values.users.length > 0 &&
                            values.users.map((user, index) => (
                              <div className="form-con" key={index}>
                                <Field name={`users.${index}.name`}>
                                  {({
                                    field,
                                    form: { touched, errors },
                                    meta,
                                  }: any) => (
                                    <div className="field">
                                      <input
                                        type="text"
                                        placeholder="Name"
                                        {...field}
                                      />
                                      {meta.touched && meta.error && (
                                        <div className="error">
                                          {meta.error}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Field>

                                <Field name={`users.${index}.gender`}>
                                  {({
                                    field,
                                    form: { touched, errors },
                                    meta,
                                  }: any) => (
                                    <div className="field">
                                      <input
                                        type="text"
                                        placeholder="Gender"
                                        {...field}
                                      />
                                      {meta.touched && meta.error && (
                                        <div className="error">
                                          {meta.error}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Field>

                                <Field name={`users.${index}.location`}>
                                  {({
                                    field,
                                    form: { touched, errors },
                                    meta,
                                  }: any) => (
                                    <div className="field">
                                      <input
                                        type="text"
                                        placeholder="Location"
                                        {...field}
                                      />
                                      {meta.touched && meta.error && (
                                        <div className="error">
                                          {meta.error}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Field>

                                <Field name={`users.${index}.relation`}>
                                  {({
                                    field,
                                    form: { touched, errors },
                                    meta,
                                  }: any) => (
                                    <div className="field">
                                      <input
                                        type="text"
                                        placeholder="Relation"
                                        {...field}
                                      />
                                      {meta.touched && meta.error && (
                                        <div className="error">
                                          {meta.error}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Field>

                                <Field name={`users.${index}.dob`}>
                                  {({
                                    field,
                                    form: { touched, errors },
                                    meta,
                                  }: any) => (
                                    <div className="field">
                                      <input
                                        type="date"
                                        placeholder="Date of Birth"
                                        {...field}
                                      />
                                      {meta.touched && meta.error && (
                                        <div className="error">
                                          {meta.error}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </Field>

                                {values.users.length > 1 && index !== 0 && (
                                  <button
                                    onClick={() => remove(index)}
                                    type="button"
                                    className="bg-red-600 px-2 py-1 rounded text-white"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            ))}
                        </div>

                        <div className="flex justify-between">
                          <Button text="Register" />

                          <button
                            className="em__button primary"
                            onClick={() => push(init)}
                            type="button"
                          >
                            Add more
                          </button>
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </SafModal>
    </div>
  );
}
