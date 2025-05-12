// Direct access to environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://njinutlkrgosnzvaltpd.supabase.co';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qaW51dGxrcmdvc256dmFsdHBkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjcyNzY0MiwiZXhwIjoyMDYyMzAzNjQyfQ.DK9WGFHXn0qlrIApo0ahnvMnGSTuMES4Dv1ytBEf3NE';

// Import Supabase client
const { createClient } = require('@supabase/supabase-js')

// Create Supabase client with service role key
function getServiceSupabase() {
  return createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

async function updateImageUrls() {
  const supabase = getServiceSupabase();
  
  console.log('Starting image URL update process...');
  console.log(`Using Supabase URL: ${SUPABASE_URL}`);
  
  // Update menu background images
  const { data: menus, error: menusError } = await supabase
    .from('menus')
    .select('id, background_image_url');
    
  if (menusError) {
    console.error('Error fetching menus:', menusError);
    return;
  }
  
  console.log(`Found ${menus.length} menus to check for background images`);
  
  for (const menu of menus) {
    if (menu.background_image_url && menu.background_image_url.includes('localhost')) {
      const newUrl = menu.background_image_url.replace(
        'http://localhost:34321',
        'https://njinutlkrgosnzvaltpd.supabase.co'
      );
      
      console.log(`Updating menu ${menu.id} background image:`);
      console.log(`  From: ${menu.background_image_url}`);
      console.log(`  To:   ${newUrl}`);
      
      const { error } = await supabase
        .from('menus')
        .update({ background_image_url: newUrl })
        .eq('id', menu.id);
        
      if (error) {
        console.error(`Error updating menu ${menu.id}:`, error);
      } else {
        console.log(`  ✓ Updated successfully`);
      }
    }
  }
  
  // Update menu logo images
  const { data: menusWithLogos, error: logosError } = await supabase
    .from('menus')
    .select('id, logo_image_url');
    
  if (logosError) {
    console.error('Error fetching menus for logos:', logosError);
    return;
  }
  
  console.log(`Found ${menusWithLogos.length} menus to check for logos`);
  
  for (const menu of menusWithLogos) {
    if (menu.logo_image_url && menu.logo_image_url.includes('localhost')) {
      const newUrl = menu.logo_image_url.replace(
        'http://localhost:34321',
        'https://njinutlkrgosnzvaltpd.supabase.co'
      );
      
      console.log(`Updating menu ${menu.id} logo:`);
      console.log(`  From: ${menu.logo_image_url}`);
      console.log(`  To:   ${newUrl}`);
      
      const { error } = await supabase
        .from('menus')
        .update({ logo_image_url: newUrl })
        .eq('id', menu.id);
        
      if (error) {
        console.error(`Error updating menu logo ${menu.id}:`, error);
      } else {
        console.log(`  ✓ Updated successfully`);
      }
    }
  }
  
  // Update dish images
  const { data: dishes, error: dishesError } = await supabase
    .from('dishes')
    .select('id, picture_url');
    
  if (dishesError) {
    console.error('Error fetching dishes:', dishesError);
    return;
  }
  
  console.log(`Found ${dishes.length} dishes to check`);
  
  for (const dish of dishes) {
    if (dish.picture_url && dish.picture_url.includes('localhost')) {
      const newUrl = dish.picture_url.replace(
        'http://localhost:30000',
        'https://njinutlkrgosnzvaltpd.supabase.co'
      );
      
      console.log(`Updating dish ${dish.id}:`);
      console.log(`  From: ${dish.picture_url}`);
      console.log(`  To:   ${newUrl}`);
      
      const { error } = await supabase
        .from('dishes')
        .update({ picture_url: newUrl })
        .eq('id', dish.id);
        
      if (error) {
        console.error(`Error updating dish ${dish.id}:`, error);
      } else {
        console.log(`  ✓ Updated successfully`);
      }
    }
  }
  
  console.log('Image URLs update process completed!');
}

updateImageUrls().catch(error => {
  console.error('Script failed with error:', error);
  process.exit(1);
});