import React from 'react';
import {Container} from "../@common/Container";
import {useStore} from "../../hooks";
import {Button} from "../@common/Button";
import {Formik} from "formik";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {Navigation} from "../../types";
import {
    addUserFormInitialValues,
    addUserFormInputs,
    addUserFormValidationSchema
} from "../../constants/addUserForm";
import {isEmpty} from "lodash";
import {AddUserFormInput} from "./AddUserFormInput";

export const AddUserForm = observer(() => {
    const {users} = useStore();

    const navigate = useNavigate();

    return (
        <Container>
            <Formik
                validationSchema={addUserFormValidationSchema}
                validateOnBlur
                initialValues={addUserFormInitialValues}
                onSubmit={(user) => {
                    users.addUser(user, () => {
                        alert("User added successfully!");
                        navigate(Navigation.MAIN)
                    })
                }}>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      /* and other goodies */
                  }) => (
                    <form className={'add-user-form'} onSubmit={handleSubmit}>
                        {addUserFormInputs.map(input => (
                            <AddUserFormInput
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
                            disabled={isSubmitting || users.isLoading || !isEmpty(errors)}
                            type={'submit'}
                        >
                            Add user
                        </Button>
                    </form>
                )}
            </Formik>
        </Container>
    );
});

