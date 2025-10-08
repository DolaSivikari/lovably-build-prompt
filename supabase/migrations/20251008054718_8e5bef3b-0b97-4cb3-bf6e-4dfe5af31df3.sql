-- Add the current user as a super admin
-- User ID from the session: 3d17aac8-8127-4d9c-a9be-90171283d945
INSERT INTO public.user_roles (user_id, role)
VALUES ('3d17aac8-8127-4d9c-a9be-90171283d945', 'super_admin')
ON CONFLICT (user_id, role) DO NOTHING;