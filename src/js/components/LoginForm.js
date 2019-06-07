/* @flow */
import React from "react"

import type {Credentials} from "../lib/Credentials"
import AppError from "../models/AppError"
import {reactElementProps} from "../test/integration"

type Props = {
  credentials: Credentials,
  error: ?AppError,
  onChange: (Credentials) => void,
  onSubmit: Function,
  cancel: Function,
  validate: Function,
  status: "connected" | "disconnected" | "connecting"
}

export default function LoginForm(props: Props) {
  let {host, port, user, pass} = props.credentials

  function onChange(e) {
    props.onChange({
      ...props.credentials,
      [e.target.name]: e.target.value
    })
  }

  function onSubmit(e) {
    e.preventDefault()
    props.cancel()
    if (props.validate(props.credentials)) props.onSubmit(e)
  }

  return (
    <form
      className="admin-form"
      onSubmit={onSubmit}
      {...reactElementProps("login")}
    >
      <LoginFormField
        name="host"
        value={host || ""}
        onChange={onChange}
        autoFocus
      />
      <LoginFormField name="port" value={port || ""} onChange={onChange} />
      <LoginFormField name="user" value={user} onChange={onChange} />
      <LoginFormField
        name="pass"
        value={pass}
        onChange={onChange}
        type="password"
      />
      <LoginButton status={props.status} />
      {props.status === "connecting" && (
        <div className="status-message">
          <p>
            Connecting to boom...<a onClick={props.cancel}>Cancel</a>
          </p>
        </div>
      )}
      {props.error && (
        <div className="status-message">
          <p className="form-error">{props.error.message()}</p>
        </div>
      )}
    </form>
  )
}

function LoginFormField(props) {
  return (
    <div className="form-field">
      <label>{props.name}</label>
      <input type="text" {...props} />
    </div>
  )
}

function LoginButton({status}) {
  return (
    <button type="submit" className="button">
      {status === "connecting" ? "Connecting..." : "Connect"}
    </button>
  )
}