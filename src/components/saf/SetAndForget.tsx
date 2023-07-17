"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { NotificationManager } from "react-notifications";
import * as Yup from "yup";
import Button from "../Button";
import { createUser } from "@/lib/api/saf.api";

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

const SetAndForget = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (data: any) => {
    try {
      await createUser(data);
    } catch {}
  };

  return (
    <div className="flex gap-5">
      <div className="w-1/2 flex-1">
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
      <div className="w-1/2 flex-1 overflow-y-auto saf_form">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            await handleSubmit(values);
          }}
          validationSchema={Yup.object({
            users: Yup.array(
              Yup.object({
                name: Yup.string().required().min(3).max(20),
                gender: Yup.string().required(),
                relation: Yup.string().required(),
                dob: Yup.string().required(),
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
                                  <span className="error">{meta.error}</span>
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
                                  <span className="error">{meta.error}</span>
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
                                  <span className="error">{meta.error}</span>
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
                                  <span className="error">{meta.error}</span>
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
                    <Button text="Register" />

                    <button
                      className="em__button primary"
                      onClick={() => addField(init)}
                      type="button"
                    >
                      Add more
                    </button>
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
