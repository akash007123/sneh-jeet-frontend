import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Lock, User, Heart, Rainbow, Sparkles, Globe, Users, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AxiosError } from 'axios';

// Pride gradient colors matching the LGBTQIA+ flag progression
const PRIDE_COLORS = [
  '#FF0018', // Red
  '#FFA52C', // Orange
  '#FFFF41', // Yellow
  '#008018', // Green
  '#0000F9', // Blue
  '#86007D'  // Purple
];

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', role: '', mobile: '' });
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { login, signup, forgotPassword, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  // Animated background color cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveColorIndex((prev) => (prev + 1) % PRIDE_COLORS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoginLoading(true);
    try {
      await login(loginData.email, loginData.password);
      toast({
        title: 'Login successful',
        description: 'Welcome back! 🌈',
      });
      navigate('/admin');
    } catch (error) {
      const description = error instanceof AxiosError && error.response?.data?.error ? error.response.data.error : 'An error occurred';
      toast({
        title: 'Login failed',
        description,
        variant: 'destructive',
      });
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignupLoading(true);
    try {
      await signup(signupData.name, signupData.email, signupData.password, signupData.role, signupData.mobile || undefined, profilePic || undefined);
      toast({
        title: 'Signup successful',
        description: 'Account created successfully! 🎉',
      });
      navigate('/admin');
    } catch (error) {
      const description = error instanceof AxiosError && error.response?.data?.error ? error.response.data.error : 'An error occurred';
      toast({
        title: 'Signup failed',
        description,
        variant: 'destructive',
      });
    } finally {
      setIsSignupLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsForgotPasswordLoading(true);
    try {
      await forgotPassword(forgotPasswordEmail);
      toast({
        title: 'Reset email sent',
        description: 'Check your email for password reset instructions.',
      });
      setIsForgotPasswordOpen(false);
      setForgotPasswordEmail('');
    } catch (error) {
      const description = error instanceof AxiosError && error.response?.data?.error ? error.response.data.error : 'An error occurred';
      toast({
        title: 'Error',
        description,
        variant: 'destructive',
      });
    } finally {
      setIsForgotPasswordLoading(false);
    }
  };

  // Dynamic gradient background
  const getGradientBackground = () => {
    const nextIndex = (activeColorIndex + 1) % PRIDE_COLORS.length;
    return `linear-gradient(135deg, ${PRIDE_COLORS[activeColorIndex]} 0%, ${PRIDE_COLORS[nextIndex]} 50%, ${PRIDE_COLORS[(nextIndex + 1) % PRIDE_COLORS.length]} 100%)`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-in-out"
        style={{ background: getGradientBackground() }}
      />
      
      {/* Floating pride elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              background: PRIDE_COLORS[i % PRIDE_COLORS.length],
              borderRadius: '50%',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main card with enhanced LGBTQIA theme */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="w-full shadow-2xl border-0 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 overflow-hidden">
          {/* Animated rainbow border */}
          <div className="h-1 w-full bg-gradient-to-r from-red-400 via-orange-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400 animate-gradient-x" />
          
          <CardHeader className="text-center relative">
            {/* Animated icon container */}
            <motion.div 
              className="relative w-20 h-20 mx-auto mb-4"
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full animate-spin-slow" />
              <motion.div
                className="relative z-10 flex items-center justify-center w-full h-full"
                animate={isHovering ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="w-10 h-10 text-white" fill="white" />
                <Rainbow className="w-6 h-6 text-yellow-300 absolute -top-1 -right-1" />
              </motion.div>
              <Sparkles className="absolute -top-2 -left-2 w-4 h-4 text-yellow-400 animate-pulse" />
              <Sparkles className="absolute -bottom-2 -right-2 w-4 h-4 text-pink-400 animate-pulse delay-300" />
            </motion.div>
            
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Sneh Jeet
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 mt-2">
              Social Welfare Society, Ujjain, MP
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger 
                  value="login"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Login
                  </motion.div>
                </TabsTrigger>
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-teal-500 data-[state=active]:text-white transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Sign Up
                  </motion.div>
                </TabsTrigger>
              </TabsList>
              
              {/* Login Form */}
              <AnimatePresence mode="wait">
                <TabsContent key="login" value="login">
                  <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleLogin}
                    className="space-y-6 pt-4"
                  >
                    {['email', 'password'].map((field, index) => (
                      <motion.div
                        key={field}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <Label 
                          htmlFor={`login-${field}`}
                          className="text-gray-700 dark:text-gray-300 font-medium mb-2 block"
                        >
                          {field === 'email' ? 'Email Address' : 'Password'}
                        </Label>
                        <div className="relative">
                          {field === 'email' ? (
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500 transition-colors duration-200 group-hover:text-pink-500" />
                          ) : (
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 transition-colors duration-200 group-hover:text-teal-500" />
                          )}
                          <Input
                            id={`login-${field}`}
                            type={field === 'password' ? 'password' : 'email'}
                            value={loginData[field as keyof typeof loginData]}
                            onChange={(e) => setLoginData({ ...loginData, [field]: e.target.value })}
                            className="pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 focus:border-purple-500 focus:scale-[1.02] focus:shadow-lg group-hover:border-purple-300"
                            required
                          />
                          <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                        </div>
                      </motion.div>
                    ))}
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/25 relative overflow-hidden group"
                        disabled={isLoginLoading}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isLoginLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <>
                              <Rainbow className="w-5 h-5" />
                              Access Community
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </motion.div>
                
                    <div className="text-center pt-4">
                      <button
                        type="button"
                        onClick={() => setIsForgotPasswordOpen(true)}
                        className="text-purple-500 hover:text-purple-700 underline text-sm"
                      >
                        Forgot Password?
                      </button>
                    </div>
                
                    <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        ✨ Inclusive space for all identities
                      </p>
                    </div>
                  </motion.form>
                </TabsContent>
                
                {/* Signup Form */}
                <TabsContent key="signup" value="signup">
                  <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSignup}
                    className="space-y-6 pt-4"
                  >
                    {[
                      { id: 'name', label: 'Full Name', icon: User },
                      { id: 'email', label: 'Email Address', icon: Mail },
                      { id: 'password', label: 'Password', icon: Lock }
                    ].map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <Label
                          htmlFor={`signup-${field.id}`}
                          className="text-gray-700 dark:text-gray-300 font-medium mb-2 block"
                        >
                          {field.label}
                        </Label>
                        <div className="relative">
                          <field.icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 transition-colors duration-200 group-hover:text-teal-500" />
                          <Input
                            id={`signup-${field.id}`}
                            type={field.id === 'password' ? 'password' : field.id === 'email' ? 'email' : 'text'}
                            value={signupData[field.id as keyof typeof signupData]}
                            onChange={(e) => setSignupData({ ...signupData, [field.id]: e.target.value })}
                            className="pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 focus:border-blue-500 focus:scale-[1.02] focus:shadow-lg group-hover:border-blue-300"
                            required
                          />
                          <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500 group-hover:w-full transition-all duration-300" />
                        </div>
                      </motion.div>
                    ))}

                    {/* Mobile Number Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative group"
                    >
                      <Label
                        htmlFor="signup-mobile"
                        className="text-gray-700 dark:text-gray-300 font-medium mb-2 block"
                      >
                        Mobile Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 transition-colors duration-200 group-hover:text-teal-500" />
                        <Input
                          id="signup-mobile"
                          type="tel"
                          placeholder="Enter mobile number"
                          value={signupData.mobile}
                          onChange={(e) => setSignupData({ ...signupData, mobile: e.target.value })}
                          className="pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 focus:border-blue-500 focus:scale-[1.02] focus:shadow-lg group-hover:border-blue-300"
                        />
                        <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500 group-hover:w-full transition-all duration-300" />
                      </div>
                    </motion.div>
                    
                    {/* Role Selection with inclusive options */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="relative group"
                    >
                      <Label htmlFor="signup-role" className="text-gray-700 dark:text-gray-300 font-medium mb-2 block">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          Community Role
                        </div>
                      </Label>
                      <Select value={signupData.role} onValueChange={(value) => setSignupData({ ...signupData, role: value })}>
                        <SelectTrigger className="w-full py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 focus:border-blue-500 group-hover:border-blue-300">
                          <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-blue-500" />
                            <SelectValue placeholder="Select your role in our community" />
                          </div>
                        </SelectTrigger>
                        <SelectContent className="border-0 shadow-xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg">
                          {[
                            { value: 'Admin', emoji: '👑', description: 'Full system access' },
                            { value: 'Manager', emoji: '🤝', description: 'Team coordination' },
                            { value: 'Vice-manager', emoji: '🌟', description: 'Assistant leadership' },
                            { value: 'HR', emoji: '💼', description: 'Community support' },
                            { value: 'Volunteer', emoji: '🌈', description: 'Event participation' },
                            { value: 'Member', emoji: '❤️', description: 'Community engagement' },
                            { value: 'User', emoji: '❤️', description: 'Community user' },
                          ].map((role) => (
                            <SelectItem 
                              key={role.value} 
                              value={role.value}
                              className="py-3 cursor-pointer transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-teal-50 dark:hover:from-blue-900/30 dark:hover:to-teal-900/30"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xl">{role.emoji}</span>
                                <div>
                                  <div className="font-medium">{role.value}</div>
                                  <div className="text-sm text-gray-500">{role.description}</div>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Profile Picture Upload */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="relative group"
                    >
                      <Label htmlFor="signup-profilePic" className="text-gray-700 dark:text-gray-300 font-medium mb-2 block">
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5" />
                          Profile Picture (Optional)
                        </div>
                      </Label>
                      <div className="relative">
                        <Input
                          id="signup-profilePic"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
                          className="pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-xl transition-all duration-300 focus:border-blue-500 focus:scale-[1.02] focus:shadow-lg group-hover:border-blue-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 transition-colors duration-200 group-hover:text-teal-500" />
                        <div className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-teal-500 group-hover:w-full transition-all duration-300" />
                      </div>
                      {profilePic && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          Selected: {profilePic.name}
                        </p>
                      )}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 relative overflow-hidden group"
                        disabled={isSignupLoading}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSignupLoading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <>
                              <Heart className="w-5 h-5" />
                              Join Our Community
                            </>
                          )}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </Button>
                    </motion.div>
                    
                    <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        🤝 We celebrate diversity and inclusion
                      </p>
                    </div>
                  </motion.form>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </CardContent>
          
          {/* Decorative pride elements at bottom */}
          <div className="h-2 w-full bg-gradient-to-r from-red-400 via-orange-400 via-yellow-400 via-green-400 via-blue-400 via-indigo-400 to-purple-400" />
        </Card>

        <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Forgot Password</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email Address</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isForgotPasswordLoading}>
                {isForgotPasswordLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Email'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Accessibility statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6 text-sm text-white/80"
        >
          <p className="flex items-center justify-center gap-2">
            <span className="text-xl">🏳️‍🌈</span>
            A safe space for all gender identities and expressions
          </p>
        </motion.div>
      </motion.div>

    </div>
  );
};

export default Login;