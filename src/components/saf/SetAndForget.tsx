"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { NotificationManager } from "react-notifications";
import * as Yup from "yup";
import Button from "../Button";
import { createUser } from "@/lib/api/saf.api";
import { useRouter } from "next/navigation";
import { parseError } from "@/lib/utils";

const categories = [
  "Graduation",
  "Wedding",
  "Retirement",
  "Birthday",
  "Anniversary",
  "Engagement",
  "Baby shower",
  "Gender revel",
  "Father’s Day",
  "Mother’s Day",
  "Team gathering",
  "Welcome back",
  "Housewarming",
  "Promotion",
  "Job Promotion",
  "Bon Voyage (Farewell)",
  "Friendship Day",
];

const initialValues = {
  users: [
    {
      prompt: "",
      date: "",
      category: "",
    },
  ],
};
const init = { prompt: "", date: "", category: "" };

const SetAndForget = ({
  close,
  points,
}: {
  close: () => void;
  points: string | undefined;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createUser(data);
      NotificationManager.success(
        "Set and forget user(s) saved successfully",
        "Success message"
      );
      router.refresh();
      close();
    } catch (err: any) {
      parseError(err.response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-5 flex-col sm:flex-row">
      <div className="sm:w-1/2 flex-1 w-full">
        <div className="em__header_2">
          <h1>Set &</h1>
          <span className="em__fancy__text">Forget</span>
        </div>

        <div>
          <p>
            Stay ahead of the game by registering your friends and family&#39;s
            birthdays, simply fill in the details, and let us take care of the
            rest. Receive personalized designs and birthday ideas notifications
            well in advance of their special day, ensuring a memorable and
            delightful celebration.
          </p>
        </div>
      </div>
      <div className="sm:w-1/2 w-full flex-1 overflow-y-auto saf_form">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            await handleSubmit(values);
          }}
          validationSchema={Yup.object({
            users: Yup.array(
              Yup.object({
                prompt: Yup.string().required("Prompt is Required").min(3),
                category: Yup.string().required("Category is Required"),
                date: Yup.string().required("Date is Required"),
              })
            )
              .min(1)
              .max(5),
          })}
        >
          {({ values, setFieldValue }) => {
            const addField = (val: any) => {
              const newVal = [...values.users, val];
              setFieldValue("users", newVal);
            };

            const remove = (index: number) => {
              const newVal = values.users.filter((_, i) => i != index);
              setFieldValue("users", newVal);
            };

            return (
              <Form>
                <React.Fragment>
                  <div>
                    <div className="inline-flex bg-red-50 p-2 rounded ">
                      <h1 className="font-bold mx-1">Points:</h1>
                      <span>
                        {points}
                        <small>pts</small>{" "}
                      </span>
                    </div>
                    {values.users.length > 0 &&
                      values.users.map((user, index) => (
                        <div className="form-con" key={index}>
                          <Field name={`users.${index}.category`}>
                            {({
                              field,
                              form: { touched, errors },
                              meta,
                            }: any) => (
                              <div className="field">
                                <select {...field}>
                                  <option>Select Category</option>
                                  {categories.map((category) => (
                                    <option value={category} key={category}>
                                      {category}
                                    </option>
                                  ))}
                                </select>
                                {meta.touched && meta.error && (
                                  <span className="error">{meta.error}</span>
                                )}
                              </div>
                            )}
                          </Field>

                          <Field name={`users.${index}.date`}>
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
                                  <span className="error">{meta.error}</span>
                                )}
                              </div>
                            )}
                          </Field>

                          <Field name={`users.${index}.prompt`}>
                            {({
                              field,
                              form: { touched, errors },
                              meta,
                            }: any) => (
                              <div className="field textarea">
                                <textarea
                                  placeholder="Prompt"
                                  {...field}
                                ></textarea>
                                {meta.touched && meta.error && (
                                  <span className="error">{meta.error}</span>
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
                    <Button
                      text="Register"
                      loading={loading}
                      disabled={loading}
                    />

                    {/* <button
                      className="em__button primary"
                      onClick={() => addField(init)}
                      type="button"
                    >
                      Add more
                    </button> */}
                  </div>
                </React.Fragment>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SetAndForget;
