import React from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { object, string } from 'yup'

const StyledPledgeForm = styled(Form)`
  color: white;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  * + * {
    margin-top: 15px;
  }
`

const StyledField = styled(Field)`
  padding: 5px;
  border: none;
  box-shadow: none;
  border-radius: 3px;
  color: #222;
  width: 200px;
  height: 50px;
  font-size: 18px;
  width: 100%;
`

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledButton = styled.button`
  background-color: #e9e9e9;
  color: #333333;
  font-size: 20px;
  padding: 5px 10px;
  cursor: pointer;
  border: 0;
  height: 40px;
  font-weight: 500;
  width: 150px;
  box-shadow: none;
  border-radius: 2px;
  align-self: center;
  transition: 0.22s;

  :hover {
    background-color: #d4d4d4;
    color: #777777;
  }

  :disabled {
    background-color: #aaa;
  }
`

const SuccessMessage = styled.div`
  background: #eee;
  padding: 10px;
  border-radius: 5px;
  color: #3252cd;
`

const StyledFormError = styled.div`
  background: #eee;
  padding: 10px;
  border-radius: 5px;
  color: red;
`

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
`

const CREATE_USER = gql`
  mutation addPledge($email: String!) {
    addPledge(email: $email) {
      email
    }
  }
`

const schema = object().shape({
  email: string()
    .email()
    .required(),
})

export default function PledgeForm() {
  return (
    <Mutation mutation={CREATE_USER}>
      {(createUser, { data }) => {
        if (data) {
          return (
            <SuccessMessage>
              Thanks! We'll email you with updates when they're available!
            </SuccessMessage>
          )
        }
        return (
          <Formik
            initialValues={{ email: '' }}
            onSubmit={(values, actions) => {
              createUser({ variables: values })
                .catch(error => {
                  if (error.message.match(/duplicate/)) {
                    actions.setErrors({
                      email: 'This email address has already signed up',
                    })
                  } else {
                    actions.setStatus({
                      message:
                        'An unexpected error occurred. Please try again.',
                    })
                  }
                })
                .then(() => {
                  actions.setSubmitting(false)
                })
            }}
            validationSchema={schema}
            render={({ isSubmitting, status }) => (
              <StyledPledgeForm>
                <StyledFormRow>
                  <StyledField
                    type="email"
                    name="email"
                    placeholder="Email address"
                  />
                  <StyledErrorMessage component="div" name="email" />
                </StyledFormRow>
                <StyledButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </StyledButton>
                {status &&
                  status.message && (
                    <StyledFormError>{status.message}</StyledFormError>
                  )}
              </StyledPledgeForm>
            )}
          />
        )
      }}
    </Mutation>
  )
}
