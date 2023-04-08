import { useState, useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ApplicationContext } from "../App"
import { Login } from "./Login"
import { NotAuth } from "./NotAuth"


export const ProtectedRoutes = () => {
    let {loggedIn} = useContext(ApplicationContext)


    return loggedIn ? <Outlet /> : <NotAuth/>



}