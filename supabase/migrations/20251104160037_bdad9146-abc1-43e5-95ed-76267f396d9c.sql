-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

-- Recreate it using the security definer function to avoid recursion
CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'));

-- Also update the WITH CHECK for insert/update operations
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;

CREATE POLICY "Admins can manage roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));