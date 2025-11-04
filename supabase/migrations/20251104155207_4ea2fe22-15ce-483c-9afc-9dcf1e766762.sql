-- Add unique constraint to ensure only one admin
CREATE UNIQUE INDEX unique_admin_role ON public.user_roles (role) WHERE role = 'admin';