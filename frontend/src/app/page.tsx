import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center 
                     justify-center gap-6 bg-slate-50 p-8">

      {/* Project Name */}
      <h1 className="text-5xl font-bold text-slate-900">
        Hirely AI 🚀
      </h1>
      <p className="text-slate-500 text-lg">
        AI-Powered Resume Analyzer
      </p>

      {/* Check shadcn Badge */}
      <div className="flex gap-2">
        <Badge>Next.js 14 ✅</Badge>
        <Badge variant="secondary">Tailwind v4 ✅</Badge>
        <Badge variant="outline">shadcn/ui ✅</Badge>
      </div>

      {/* Check shadcn Card */}
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Setup Checklist</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 
                                text-sm text-slate-600">
          <p>✅ Next.js 14 App Router</p>
          <p>✅ Tailwind CSS v4</p>
          <p>✅ shadcn/ui components</p>
          <p>✅ TypeScript</p>
          <p>✅ Folder structure ready</p>
        </CardContent>
      </Card>

      {/* Check shadcn Button */}
      <div className="flex gap-3">
        <Button>Primary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

    </main>
  );
}