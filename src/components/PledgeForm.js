import React from 'react'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { object, string } from 'yup'

const StyledPledgeForm = styled(Form)`
  color: white;
  border: 1px white solid;
  border-radius: 5px;
  padding: 20px;
`

const StyledField = styled(Field)`
  padding: 5px;
  border-radius: 5px;
  border: 1px #ccc solid;
  box-shadow: none;
  color: #222;
  width: 200px;
`

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledButton = styled.button`
  background-color: #6a958e;
  color: white;
  font-size: large;
  padding: 5px 10px;
  cursor: pointer;
  border: 0;
  box-shadow: none;
  border-radius: 5px;

  :hover {
    background-color: #547771;
  }

  :disabled {
    background-color: #aaa;
  }
`

const SuccessMessage = styled.div`
  background: #eee;
  padding: 10px;
  border-radius: 5px;
  color: lightcoral;
`

const StyledFormError = styled.div`
  background: #eee;
  padding: 10px;
  border-radius: 5px;
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

export default function PledgeForm(props) {
  return (
    <Mutation mutation={CREATE_USER}>
      {(createUser, { loading, data }) => {
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
                  <ErrorMessage name="email" />
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
