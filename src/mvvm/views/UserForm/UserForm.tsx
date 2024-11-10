import React from 'react';
import {Formik} from "formik";
import {UserFormInput} from "./UserFormInput";
import {Button, Container} from "@library";
import {isEmpty} from "lodash";
import {childView} from "@yoskutik/react-vvm";
import {UserFormViewModel} from "@viewModels";
import {useNavigate} from "react-router-dom";

interface UserFormProps {
    userId?: string;
    buttonTitle: string;
}

export const UserForm = childView<UserFormViewModel>()<UserFormProps>(({
    viewModel,
    userId,
    buttonTitle,
}) => {
    const navigate = useNavigate();
    if(viewModel.initialValues) {
        return (
            <Container>
                <Formik
                    validationSchema={viewModel.validationSchema}
                    validateOnBlur
                    initialValues={viewModel.initialValues}
                    onSubmit={(form) => {
                        viewModel.onSubmit(form, () => navigate(-1), userId)
                    }}>
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                      }) => (
                        <form className={'add-user-form'} onSubmit={handleSubmit}>
                            {viewModel.inputs.map(input => (
                                <UserFormInput
                                    key={input}
                                    touched={touched[input]}
                                    error={errors[input]}
                                    name={input}
                                    value={values[input]}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                            ))}

                            <Button
                                disabled={
                                    isSubmitting || viewModel.usersModel!.isLoading || !isEmpty(errors)
                                    || JSON.stringify(viewModel.initialValues) === JSON.stringify(values)
                                }
                                type={'submit'}
                            >
                                {buttonTitle}
                            </Button>
                        </form>
                    )}
                </Formik>
            </Container>
        );
    }
    else {
        return null
    }
});