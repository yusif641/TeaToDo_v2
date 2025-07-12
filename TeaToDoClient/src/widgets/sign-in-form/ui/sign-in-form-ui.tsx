import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Button } from "@/shared/components/ui/button";

const SignInForm: React.FC = () => {
    return (
        <div className="w-[50vw] flex items-center justify-center border-1-2 border-[#989A99] h-screen relative">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className='text-center text-lg'>Sign in to your account</CardTitle>
                    <CardDescription className='text-center'>
                        Enter your email and password below to sign in
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="flex items-start gap-3">
                                <Checkbox id="terms-2" defaultChecked />
                                <div className="grid gap-2">
                                    <Label htmlFor="terms-2">Accept terms and conditions</Label>
                                    <p className="text-muted-foreground text-sm">
                                        By clicking this checkbox, you agree to the terms and conditions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full cursor-pointer">
                        Sign in
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default SignInForm;