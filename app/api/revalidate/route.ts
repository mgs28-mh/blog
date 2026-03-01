import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/revalidate
 * 
 * On-Demand Revalidation endpoint for Contentful Webhook.
 * 
 * Setup di Contentful:
 * 1. Buka Settings > Webhooks
 * 2. Buat webhook baru dengan URL: https://your-domain.com/api/revalidate
 * 3. Tambahkan header: x-revalidate-secret dengan value dari REVALIDATION_SECRET
 * 4. Pilih trigger: Entry publish, Entry unpublish, Entry delete
 */
export async function POST(request: NextRequest) {
  try {
    // Validasi secret token untuk keamanan
    const secret = request.headers.get("x-revalidate-secret");
    
    if (!process.env.REVALIDATION_SECRET) {
      console.error("REVALIDATION_SECRET environment variable is not set");
      return NextResponse.json(
        { revalidated: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    if (secret !== process.env.REVALIDATION_SECRET) {
      console.warn("Invalid revalidation secret received");
      return NextResponse.json(
        { revalidated: false, message: "Invalid secret" },
        { status: 401 }
      );
    }

    // Parse body untuk logging (optional)
    let body = null;
    try {
      body = await request.json();
    } catch {
      // Body mungkin kosong, tidak masalah
    }

    // Log webhook event untuk debugging
    const webhookName = request.headers.get("x-contentful-webhook-name") || "unknown";
    const contentType = body?.sys?.contentType?.sys?.id || "unknown";
    const entryId = body?.sys?.id || "unknown";

    console.log(`[Revalidate] Webhook: ${webhookName}, ContentType: ${contentType}, EntryID: ${entryId}`);

    // Revalidate cache dengan tag 'articles'
    revalidateTag("articles");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Cache revalidated successfully",
      webhook: webhookName,
    });
  } catch (error) {
    console.error("[Revalidate] Error:", error);
    
    return NextResponse.json(
      { 
        revalidated: false, 
        message: error instanceof Error ? error.message : "Unknown error occurred" 
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint untuk testing manual (disable di production)
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid secret" },
      { status: 401 }
    );
  }

  try {
    revalidateTag("articles");
    
    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Cache revalidated successfully (manual trigger)",
    });
  } catch (error) {
    return NextResponse.json(
      { 
        revalidated: false, 
        message: error instanceof Error ? error.message : "Unknown error occurred" 
      },
      { status: 500 }
    );
  }
}
