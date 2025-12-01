"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (isLogin) {
                const result = await signIn("credentials", {
                    email: formData.email,
                    password: formData.password,
                    redirect: false,
                });

                if (result?.error) {
                    setError("Credenciais inválidas");
                } else {
                    router.push("/");
                }
            } else {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                });

                const data = await res.json();

                if (res.ok) {
                    await signIn("credentials", {
                        email: formData.email,
                        password: formData.password,
                        redirect: false,
                    });
                    router.push("/");
                } else {
                    setError(data.message || "Erro ao criar conta");
                }
            }
        } catch (err) {
            setError("Erro ao processar solicitação");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
                style={{
                    backgroundImage: "url('https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png')",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors mb-6"
                >
                    <ArrowLeft size={20} />
                    <span>Voltar</span>
                </Link>

                {/* Card */}
                <div className="bg-dark-card rounded-2xl shadow-2xl p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-block p-4 rounded-full bg-primary/20 mb-4">
                            <span className="text-5xl">💈</span>
                        </div>
                        <h1 className="text-3xl font-display text-white mb-2">
                            {isLogin ? "Bem-vindo de Volta!" : "Criar Conta"}
                        </h1>
                        <p className="text-gray-400">
                            {isLogin ? "Faça login para agendar seu horário" : "Cadastre-se para começar"}
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-secondary/20 border border-secondary rounded-lg p-3 mb-4"
                        >
                            <p className="text-secondary text-sm text-center">{error}</p>
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Nome Completo
                                </label>
                                <div className="relative">
                                    <User
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required={!isLogin}
                                        className="w-full pl-10 pr-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                                        placeholder="Seu nome"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="seu@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Senha</label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-10 pr-12 py-3 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {isLogin && (
                            <div className="text-right">
                                <Link href="/recuperar-senha" className="text-sm text-primary hover:underline">
                                    Esqueceu a senha?
                                </Link>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primary hover:bg-primary-hover rounded-lg text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Processando..." : isLogin ? "Entrar" : "Criar Conta"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-700"></div>
                        <span className="px-4 text-gray-400 text-sm">OU</span>
                        <div className="flex-1 border-t border-gray-700"></div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full py-3 bg-white hover:bg-gray-100 rounded-lg text-dark font-semibold transition-colors flex items-center justify-center space-x-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        <span>Continuar com Google</span>
                    </button>

                    {/* Toggle */}
                    <div className="text-center mt-6">
                        <p className="text-gray-400">
                            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setError("");
                                }}
                                className="text-primary hover:underline font-semibold"
                            >
                                {isLogin ? "Criar conta" : "Fazer login"}
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
