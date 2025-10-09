import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Shield, Smartphone, Key, Copy, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode';
import { PasswordStrengthIndicator } from '@/components/admin/PasswordStrengthIndicator';

export default function SecuritySettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showMfaSetup, setShowMfaSetup] = useState(false);
  const [qrCode, setQrCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    // Check MFA status
    const { data: factors } = await supabase.auth.mfa.listFactors();
    setMfaEnabled(factors?.totp?.length > 0);
    setLoading(false);
  };

  const startMfaEnrollment = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.mfa.enroll({ factorType: 'totp' });
      
      if (error) throw error;

      const { totp } = data;
      setSecret(totp.secret);

      // Generate QR code
      const { data: { user } } = await supabase.auth.getUser();
      const qrCodeUrl = totp.qr_code || `otpauth://totp/${user?.email}?secret=${totp.secret}&issuer=Ascent Group CMS`;
      const qr = await QRCode.toDataURL(qrCodeUrl);
      setQrCode(qr);
      setShowMfaSetup(true);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyAndEnableMfa = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        variant: 'destructive',
        title: 'Invalid Code',
        description: 'Please enter a 6-digit verification code',
      });
      return;
    }

    try {
      setVerifying(true);
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const factor = factors?.totp?.[0];

      if (!factor) throw new Error('No TOTP factor found');

      const { data, error } = await supabase.auth.mfa.challengeAndVerify({
        factorId: factor.id,
        code: verificationCode,
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Two-factor authentication has been enabled',
      });

      setMfaEnabled(true);
      setShowMfaSetup(false);
      setVerificationCode('');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: error.message || 'Invalid verification code',
      });
    } finally {
      setVerifying(false);
    }
  };

  const disableMfa = async () => {
    try {
      setLoading(true);
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const factor = factors?.totp?.[0];

      if (factor) {
        const { error } = await supabase.auth.mfa.unenroll({ factorId: factor.id });
        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Two-factor authentication has been disabled',
        });
        setMfaEnabled(false);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: 'Copied',
      description: 'Secret key copied to clipboard',
    });
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Passwords do not match',
      });
      return;
    }

    if (newPassword.length < 12) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Password must be at least 12 characters',
      });
      return;
    }

    try {
      setChangingPassword(true);
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Password has been changed successfully',
      });
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Security Settings</h1>
          <p className="text-muted-foreground">Manage your authentication and security preferences</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* MFA Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>
              Add an extra layer of security to your account with TOTP-based 2FA
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!showMfaSetup ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Status: {mfaEnabled ? (
                      <span className="text-primary">Enabled ✓</span>
                    ) : (
                      <span className="text-muted-foreground">Disabled</span>
                    )}
                  </p>
                </div>
                <Button
                  onClick={mfaEnabled ? disableMfa : startMfaEnrollment}
                  variant={mfaEnabled ? 'destructive' : 'default'}
                >
                  {mfaEnabled ? 'Disable' : 'Enable'} 2FA
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <img src={qrCode} alt="MFA QR Code" className="w-64 h-64 border rounded-lg" />
                  <div className="w-full max-w-md space-y-2">
                    <Label>Or enter this secret key manually:</Label>
                    <div className="flex gap-2">
                      <Input value={secret} readOnly className="font-mono" />
                      <Button onClick={copySecret} variant="outline" size="icon">
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verification-code">Enter 6-digit verification code</Label>
                  <Input
                    id="verification-code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    className="text-center text-2xl tracking-widest"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={verifyAndEnableMfa} disabled={verifying || verificationCode.length !== 6} className="flex-1">
                    {verifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify and Enable
                  </Button>
                  <Button onClick={() => setShowMfaSetup(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Password Change Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Change Password
            </CardTitle>
            <CardDescription>
              Update your password to keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <PasswordStrengthIndicator password={newPassword} />
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
              />
            </div>
            <Button
              onClick={changePassword}
              disabled={changingPassword || !newPassword || newPassword !== confirmPassword}
            >
              {changingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
