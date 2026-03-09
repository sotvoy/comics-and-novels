/**
 * Database Seed Script
 * 
 * This script populates the database with demo data for development.
 * Run with: npx tsx supabase/seed.ts
 * 
 * Requires:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY (for admin access)
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with service role (admin)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zfsxduowawvnimojbtvk.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Demo data
const demoUsers = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    email: 'creator@example.com',
    username: 'DemoCreator',
    avatar_url: 'https://picsum.photos/seed/creator/200/200',
    bio: 'Demo creator for testing purposes',
    is_creator: true,
    created_at: new Date().toISOString()
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    email: 'reader@example.com',
    username: 'DemoReader',
    avatar_url: 'https://picsum.photos/seed/reader/200/200',
    bio: 'Demo reader for testing purposes',
    is_creator: false,
    created_at: new Date().toISOString()
  }
];

const demoSeries = [
  {
    title: 'Solo Leveling',
    slug: 'solo-leveling',
    description: 'In a world where hunters, humans who possess magical abilities, must battle deadly monsters to protect the human race from certain annihilation, a notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless loop of death and rebirth. But what happens when he discovers a mysterious program that allows him to level up infinitely?',
    cover_image: 'https://picsum.photos/seed/solo/300/450',
    type: 'comic',
    status: 'ongoing',
    author: 'Chugong',
    artist: 'Dubu (Redice)',
    genres: ['action', 'adventure', 'fantasy'],
    views: 125000,
    likes: 45000,
    user_id: '00000000-0000-0000-0000-000000000001',
    created_at: new Date().toISOString()
  },
  {
    title: 'Omniscient Reader\'s Viewpoint',
    slug: 'omniscient-reader',
    description: 'Only the Reader knows how the story will unfold. Kim Dokja is a lonely office worker who has been reading a web novel for 10 years. The story is about the end of the world, and Kim Dokja is the only one who knows how it ends. But when the story finally reaches its conclusion, Kim Dokja is transported into the world of the novel.',
    cover_image: 'https://picsum.photos/seed/omni/300/450',
    type: 'comic',
    status: 'ongoing',
    author: 'Sing-Shong',
    artist: 'REDICE',
    genres: ['action', 'fantasy', 'slice-of-life'],
    views: 98000,
    likes: 32000,
    user_id: '00000000-0000-0000-0000-000000000001',
    created_at: new Date().toISOString()
  },
  {
    title: 'Tower of God',
    slug: 'tower-of-god',
    description: 'Tower of God follows the story of Bam, a young boy who had never experienced the outside world. When he enters the Tower, he meets Rachel, a girl who wants to reach the top of the Tower and become a God. Together, they begin their journey to climb the Tower.',
    cover_image: 'https://picsum.photos/seed/tower/300/450',
    type: 'comic',
    status: 'ongoing',
    author: 'SIU',
    artist: 'SIU',
    genres: ['action', 'adventure', 'fantasy', 'mystery'],
    views: 150000,
    likes: 52000,
    user_id: '00000000-0000-0000-0000-000000000001',
    created_at: new Date().toISOString()
  },
  {
    title: 'The Beginning After The End',
    slug: 'tbate',
    description: 'King Grey has unrivaled power, wealth, and skill in the magic of rules. But when he dies and is reincarnated in a world of magic and swords, he becomes Arthur Leywin. Now, he must navigate a new life of adventure, magic, and unexpected challenges.',
    cover_image: 'https://picsum.photos/seed/tbate/300/450',
    type: 'comic',
    status: 'ongoing',
    author: 'TurtleMe',
    artist: 'Fuyuki23',
    genres: ['action', 'adventure', 'fantasy', 'magic'],
    views: 89000,
    likes: 31000,
    user_id: '00000000-0000-0000-0000-000000000001',
    created_at: new Date().toISOString()
  },
  {
    title: 'Dragon Ascension',
    slug: 'dragon-ascension',
    description: 'In a world where dragons are the supreme beings, a young human discovers he has dragon blood. Join him on his journey to become the ultimate Dragon Lord!',
    cover_image: 'https://picsum.photos/seed/dragon/300/450',
    type: 'novel',
    status: 'ongoing',
    author: 'DragonWriter',
    artist: null,
    genres: ['action', 'fantasy', 'martial-arts'],
    views: 78000,
    likes: 21000,
    user_id: '00000000-0000-0000-0000-000000000001',
    created_at: new Date().toISOString()
  },
  {
    title: 'Rebirth of the Divine Throne',
    slug: 'rebirth-throne',
    description: 'After being betrayed and killed, Zhang Yuan is reborn into a world of cultivation. With his past memories, he seeks to become the strongest and reclaim his throne.',
    cover_image: 'https://picsum.photos/seed/rebirth/300/450',
    type: 'novel',
    status: 'ongoing',
    author: 'MTT',
    artist: null,
    genres: ['action', 'fantasy', 'xianxia'],
    views: 89000,
    likes: 28000,
    user_id: '00000000-0000-0000-0000-000000000001',
    created_at: new Date().toISOString()
  }
];

const demoChapters = [
  // Solo Leveling chapters
  ...Array.from({ length: 20 }, (_, i) => ({
    series_slug: 'solo-leveling',
    chapter_number: i + 1,
    title: `Chapter ${i + 1}`,
    pages: Array.from({ length: 15 }, (_, j) => `https://picsum.photos/seed/solo-ch${i + 1}-pg${j + 1}/800/1200`),
    published_at: new Date(Date.now() - (20 - i) * 7 * 24 * 60 * 60 * 1000).toISOString()
  })),
  // Omniscient Reader chapters
  ...Array.from({ length: 15 }, (_, i) => ({
    series_slug: 'omniscient-reader',
    chapter_number: i + 1,
    title: `Chapter ${i + 1}`,
    pages: Array.from({ length: 15 }, (_, j) => `https://picsum.photos/seed/omni-ch${i + 1}-pg${j + 1}/800/1200`),
    published_at: new Date(Date.now() - (15 - i) * 7 * 24 * 60 * 60 * 1000).toISOString()
  })),
  // Tower of God chapters
  ...Array.from({ length: 25 }, (_, i) => ({
    series_slug: 'tower-of-god',
    chapter_number: i + 1,
    title: `Chapter ${i + 1}`,
    pages: Array.from({ length: 15 }, (_, j) => `https://picsum.photos/seed/tower-ch${i + 1}-pg${j + 1}/800/1200`),
    published_at: new Date(Date.now() - (25 - i) * 7 * 24 * 60 * 60 * 1000).toISOString()
  })),
  // TBATE chapters
  ...Array.from({ length: 18 }, (_, i) => ({
    series_slug: 'tbate',
    chapter_number: i + 1,
    title: `Chapter ${i + 1}`,
    pages: Array.from({ length: 15 }, (_, j) => `https://picsum.photos/seed/tbate-ch${i + 1}-pg${j + 1}/800/1200`),
    published_at: new Date(Date.now() - (18 - i) * 7 * 24 * 60 * 60 * 1000).toISOString()
  })),
  // Dragon Ascension chapters
  ...Array.from({ length: 30 }, (_, i) => ({
    series_slug: 'dragon-ascension',
    chapter_number: i + 1,
    title: `Chapter ${i + 1}`,
    content: `Chapter ${i + 1} content placeholder...`,
    published_at: new Date(Date.now() - (30 - i) * 7 * 24 * 60 * 60 * 1000).toISOString()
  })),
  // Rebirth of the Divine Throne chapters
  ...Array.from({ length: 25 }, (_, i) => ({
    series_slug: 'rebirth-throne',
    chapter_number: i + 1,
    title: `Chapter ${i + 1}`,
    content: `Chapter ${i + 1} content placeholder...`,
    published_at: new Date(Date.now() - (25 - i) * 7 * 24 * 60 * 60 * 1000).toISOString()
  }))
];

const demoComments = [
  {
    series_slug: 'solo-leveling',
    chapter_number: 1,
    user_id: '00000000-0000-0000-0000-000000000002',
    username: 'DemoReader',
    content: 'This is amazing! The art is incredible.',
    created_at: new Date().toISOString()
  },
  {
    series_slug: 'solo-leveling',
    chapter_number: 1,
    user_id: '00000000-0000-0000-0000-000000000002',
    username: 'DemoReader',
    content: 'Can\'t wait for the next chapter!',
    created_at: new Date().toISOString()
  },
  {
    series_slug: 'omniscient-reader',
    chapter_number: 1,
    user_id: '00000000-0000-0000-0000-000000000002',
    username: 'DemoReader',
    content: 'The concept is so unique! Love it.',
    created_at: new Date().toISOString()
  }
];

async function seed() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Seed Users
    console.log('Creating demo users...');
    for (const user of demoUsers) {
      const { error } = await supabase
        .from('users')
        .upsert(user, { onConflict: 'id' });
      
      if (error) {
        console.warn(`  ⚠️ User ${user.username}: ${error.message}`);
      } else {
        console.log(`  ✅ Created user: ${user.username}`);
      }
    }

    // Seed Series
    console.log('\nCreating demo series...');
    for (const series of demoSeries) {
      const { error } = await supabase
        .from('series')
        .upsert(series, { onConflict: 'slug' });
      
      if (error) {
        console.warn(`  ⚠️ Series ${series.title}: ${error.message}`);
      } else {
        console.log(`  ✅ Created series: ${series.title} (${series.type})`);
      }
    }

    // Seed Chapters
    console.log('\nCreating demo chapters...');
    let chapterCount = 0;
    for (const chapter of demoChapters) {
      // Get series_id from slug
      const { data: seriesData } = await supabase
        .from('series')
        .select('id')
        .eq('slug', chapter.series_slug)
        .single();

      if (!seriesData) continue;

      const chapterData = {
        series_id: seriesData.id,
        chapter_number: chapter.chapter_number,
        title: chapter.title,
        pages: chapter.pages || null,
        content: chapter.content || null,
        published_at: chapter.published_at,
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('chapters')
        .upsert(chapterData, { 
          onConflict: 'series_id,chapter_number' 
        });

      if (!error) chapterCount++;
    }
    console.log(`  ✅ Created ${chapterCount} chapters`);

    // Seed Comments
    console.log('\nCreating demo comments...');
    for (const comment of demoComments) {
      // Get series_id and chapter_id
      const { data: seriesData } = await supabase
        .from('series')
        .select('id')
        .eq('slug', comment.series_slug)
        .single();

      if (!seriesData) continue;

      const { data: chapterData } = await supabase
        .from('chapters')
        .select('id')
        .eq('series_id', seriesData.id)
        .eq('chapter_number', comment.chapter_number)
        .single();

      if (!chapterData) continue;

      const { error } = await supabase
        .from('comments')
        .insert({
          chapter_id: chapterData.id,
          user_id: comment.user_id,
          username: comment.username,
          content: comment.content,
          created_at: comment.created_at
        });

      if (error) {
        console.warn(`  ⚠️ Comment: ${error.message}`);
      }
    }
    console.log(`  ✅ Created ${demoComments.length} comments`);

    console.log('\n✅ Seed completed successfully!');
    console.log('\nDemo credentials:');
    console.log('  - Creator: creator@example.com');
    console.log('  - Reader: reader@example.com');
    
  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();
