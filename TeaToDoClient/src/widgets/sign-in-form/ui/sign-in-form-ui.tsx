import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Button } from "@/shared/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/components/ui/form';
import { ToastContainer } from "react-toastify";
import { signInFormSchema, type signInFields } from '../config/types';
import { useLogin } from '../hooks/useLogin';

const SignInForm: React.FC = () => {
    const [checked, setChecked] = useState(true);

    const form = useForm<signInFields>({
        resolver: zodResolver(signInFormSchema),
        mode: "onChange"
    });

    const { onSubmit, onErrorSubmit, isPending } = useLogin(checked);

    return (
        <div className="w-[50vw] flex items-center justify-center border-1-2 border-[#989A99] h-screen relative">
            <ToastContainer theme='black' position='bottom-right' />
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className='text-center text-lg'>Sign in on our website</CardTitle>
                    <CardDescription className='text-center'>
                        Enter your email and password below to login
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onErrorSubmit)}>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="m@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type='password' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Checkbox id="terms-2" defaultChecked onClick={() => setChecked(!checked)} />
                                    <div className="grid gap-2">
                                        <Label htmlFor="terms-2">Accept terms and conditions</Label>
                                        <p className="text-muted-foreground text-sm">
                                            By clicking this checkbox, you agree to the terms and conditions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Button 
                                disabled={isPending}
                                type="submit" 
                                className={`w-full cursor-pointer mt-5 ${isPending && "opacity-90"}`}
                            >Sign in</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
} 

export default SignInForm;