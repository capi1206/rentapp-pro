 "use client";
import {useState} from "react";
import {createBrowserClient} from "@supabase/ssr";
export default function Login(){
 const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [msg,setMsg]=useState("");
 const supabase=createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
 async function signIn(){const {error}=await supabase.auth.signInWithPassword({email,password}); if(error)setMsg(error.message); else location.href="/dashboard";}
 async function signUp(){const {error}=await supabase.auth.signUp({email,password}); setMsg(error?error.message:"Revisa tu correo para confirmar tu cuenta.");}
 return <main className="login"><div className="login-card"><b className="logo">Rent<span>App</span></b><small>PRO 3.0</small><h1>Tu rentabilidad, bajo control.</h1><p>Calcula, simula y decide con números claros.</p><input placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)}/><input placeholder="Contraseña" type="password" value={password} onChange={e=>setPassword(e.target.value)}/><button onClick={signIn}>Entrar</button><button className="ghost" onClick={signUp}>Crear cuenta</button><small>{msg}</small></div></main>}