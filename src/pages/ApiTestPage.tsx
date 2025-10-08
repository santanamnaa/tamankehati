"use client";
import { useState } from "react";
import { auth, tamanKehati, koleksi, users } from "../lib/api";
import { USE_REAL_API, API_BASE_URL } from "../lib/api.config";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { TestTube, CheckCircle2, XCircle, Loader2, AlertTriangle } from "lucide-react";

export function ApiTestPage() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // Login form
  const [username, setUsername] = useState("admin@example.com");
  const [password, setPassword] = useState("password");

  const runTest = async (testFn: () => Promise<any>, testName: string) => {
    setLoading(true);
    setStatus("idle");
    setOutput(`Running ${testName}...\n`);

    try {
      const result = await testFn();
      setOutput(
        `✓ ${testName} succeeded!\n\n${JSON.stringify(result, null, 2)}`
      );
      setStatus("success");
    } catch (e: any) {
      const errorMsg = e?.status
        ? `HTTP ${e.status}: ${JSON.stringify(e?.data, null, 2)}`
        : e?.message || String(e);
      setOutput(`✗ ${testName} failed!\n\n${errorMsg}`);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    await runTest(async () => {
      const loginResult = await auth.login(username, password);
      const meResult = await auth.me();
      return { login: loginResult, me: meResult };
    }, "Login & Get Current User");
  };

  const testTamanList = async () => {
    await runTest(async () => {
      return await tamanKehati.list(0, 10);
    }, "List Taman Kehati");
  };

  const testKoleksiList = async () => {
    await runTest(async () => {
      return await koleksi.list(0, 10);
    }, "List Koleksi Tumbuhan");
  };

  const testUsersList = async () => {
    await runTest(async () => {
      return await users.list(0, 10);
    }, "List Users (Super Admin only)");
  };

  const testFullFlow = async () => {
    setLoading(true);
    setStatus("idle");
    setOutput("Running full API test flow...\n\n");

    const results: any = {};
    const errors: string[] = [];

    try {
      // Step 1: Login
      setOutput((prev) => prev + "Step 1: Login...\n");
      results.login = await auth.login(username, password);
      setOutput((prev) => prev + "✓ Login successful\n\n");

      // Step 2: Get current user
      setOutput((prev) => prev + "Step 2: Get current user...\n");
      results.me = await auth.me();
      setOutput(
        (prev) => prev + `✓ Logged in as: ${results.me.username}\n\n`
      );

      // Step 3: List parks
      setOutput((prev) => prev + "Step 3: List Taman Kehati...\n");
      results.parks = await tamanKehati.list(0, 5);
      setOutput((prev) => prev + `✓ Found ${results.parks.length} parks\n\n`);

      // Step 4: List plants
      setOutput((prev) => prev + "Step 4: List Koleksi Tumbuhan...\n");
      results.plants = await koleksi.list(0, 5);
      setOutput(
        (prev) => prev + `✓ Found ${results.plants.length} plants\n\n`
      );

      setOutput(
        (prev) =>
          prev + "=== All tests passed! ===\n\n" + JSON.stringify(results, null, 2)
      );
      setStatus("success");
    } catch (e: any) {
      const errorMsg = e?.status
        ? `HTTP ${e.status}: ${JSON.stringify(e?.data, null, 2)}`
        : e?.message || String(e);
      setOutput((prev) => prev + `\n✗ Test failed!\n\n${errorMsg}`);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-lg bg-primary flex items-center justify-center">
            <TestTube className="size-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl">API Test Page</h1>
            <p className="text-muted-foreground">
              Test real API endpoints when USE_REAL_API is enabled
            </p>
          </div>
        </div>
      </div>

      {/* Config Status */}
      <Card className="p-6 bg-white">
        <h2 className="text-xl mb-4">Configuration</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">API Base URL</span>
            <Badge variant="outline">{API_BASE_URL}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Real API Enabled</span>
            {USE_REAL_API ? (
              <Badge variant="default" className="gap-1">
                <CheckCircle2 className="size-3" />
                Enabled
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <XCircle className="size-3" />
                Disabled
              </Badge>
            )}
          </div>
        </div>

        {!USE_REAL_API && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
            <AlertTriangle className="size-5 text-yellow-600 shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="mb-2">
                Real API is currently disabled. Set environment variable to
                enable:
              </p>
              <code className="bg-yellow-100 px-2 py-1 rounded">
                VITE_USE_REAL_API=true
              </code>
            </div>
          </div>
        )}
      </Card>

      {/* Login Form */}
      <Card className="p-6 bg-white">
        <h2 className="text-xl mb-4">Authentication</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username / Email</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
        </div>
      </Card>

      {/* Test Actions */}
      <Card className="p-6 bg-white">
        <h2 className="text-xl mb-4">Test Actions</h2>
        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual">Individual Tests</TabsTrigger>
            <TabsTrigger value="full">Full Flow Test</TabsTrigger>
          </TabsList>

          <TabsContent value="individual" className="space-y-3 pt-4">
            <Button
              onClick={testLogin}
              disabled={loading || !USE_REAL_API}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : null}
              Test Login & Get Current User
            </Button>
            <Button
              onClick={testTamanList}
              disabled={loading || !USE_REAL_API}
              className="w-full"
              variant="outline"
            >
              {loading ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : null}
              Test List Taman Kehati
            </Button>
            <Button
              onClick={testKoleksiList}
              disabled={loading || !USE_REAL_API}
              className="w-full"
              variant="outline"
            >
              {loading ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : null}
              Test List Koleksi Tumbuhan
            </Button>
            <Button
              onClick={testUsersList}
              disabled={loading || !USE_REAL_API}
              className="w-full"
              variant="outline"
            >
              {loading ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : null}
              Test List Users (Super Admin)
            </Button>
          </TabsContent>

          <TabsContent value="full" className="pt-4">
            <Button
              onClick={testFullFlow}
              disabled={loading || !USE_REAL_API}
              className="w-full"
            >
              {loading ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : null}
              Run Full API Test Flow
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              This will sequentially test: Login → Get User → List Parks → List
              Plants
            </p>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Output */}
      {output && (
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Output</h2>
            {status === "success" && (
              <Badge variant="default" className="gap-1">
                <CheckCircle2 className="size-3" />
                Success
              </Badge>
            )}
            {status === "error" && (
              <Badge variant="destructive" className="gap-1">
                <XCircle className="size-3" />
                Error
              </Badge>
            )}
          </div>
          <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs max-h-[600px]">
            {output}
          </pre>
        </Card>
      )}

      {/* Documentation */}
      <Card className="p-6 bg-white">
        <h2 className="text-xl mb-4">Documentation</h2>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            This page demonstrates the API client integration. All other pages
            in this app use local mock data (no network dependency).
          </p>
          <p>
            To enable real API calls, set the following environment variable:
          </p>
          <code className="block bg-muted px-3 py-2 rounded">
            VITE_USE_REAL_API=true
            <br />
            VITE_API_BASE_URL=https://your-backend-host
          </code>
          <p className="pt-2">
            The API client is located at <code>/lib/api.ts</code> and follows
            the OpenAPI specification with OAuth2 password flow authentication.
          </p>
        </div>
      </Card>
    </div>
  );
}
