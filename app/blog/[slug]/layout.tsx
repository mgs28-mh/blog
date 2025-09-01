import type { Metadata } from "next";

interface BlogLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = "https://archipelago.web.id";

  return {
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
  };
}

export default async function BlogLayout({ children, params }: BlogLayoutProps) {
  const { slug } = await params; 
  return (
    <div className="bg-white text-slate-900">
      {children}
    </div>
  );
}