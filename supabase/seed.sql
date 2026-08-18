-- Run after creating a Supabase Auth user; replace the UUID below with that user's id.
-- The templates are inserted by the migration. Sample records are intentionally tied to a real Auth user.
-- psql variable example: \set demo_user '00000000-0000-0000-0000-000000000000'
insert into sites(user_id,business_name,slug,status,industry,phone,city,state,service_area,template_slug) values
(:'demo_user', 'Joe''s Landscaping','joes-landscaping','demo','Landscaping','610-555-1234','Allentown','PA','Allentown, Bethlehem and Easton','modern-service'),
(:'demo_user', 'Mike''s Plumbing','mikes-plumbing','published','Plumbing','484-555-0199','Bethlehem','PA','Greater Bethlehem','bold-contractor'),
(:'demo_user', 'Elite Auto Detailing','elite-auto-detailing','draft','Auto Detailing','610-555-0142','Easton','PA','Easton and nearby areas','clean-professional');
