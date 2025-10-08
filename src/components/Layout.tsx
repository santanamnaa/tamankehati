import { ReactNode } from "react";
import { Leaf, Home, Map, Sprout, MapPin, FileText, Info, Sparkles, BarChart, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from "./ui/dropdown-menu";

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "taman", label: "Taman", icon: Map },
    { id: "koleksi", label: "Koleksi", icon: Sprout },
    { id: "peta", label: "Peta", icon: MapPin },
    { id: "publikasi", label: "Publikasi", icon: FileText },
  ];

  const aboutItems = [
    { id: "tentang", label: "Tentang", icon: Info },
    { id: "regulasi", label: "Regulasi", icon: FileText },
    { id: "tim", label: "Tim & Kolaborator", icon: Sprout },
    { id: "kontak", label: "Kontak", icon: Map },
  ];

  const toolsItems = [
    { id: "ai-assistant", label: "AI Assistant", icon: Sparkles },
    { id: "dashboard", label: "Dashboard", icon: BarChart },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="size-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg">Taman Kehati Indonesia</h1>
                <p className="text-xs text-muted-foreground">
                  Biodiversity Conservation
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onNavigate(item.id)}
                    className="gap-2"
                  >
                    <Icon className="size-4" />
                    {item.label}
                  </Button>
                );
              })}

              {/* Tentang Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={["tentang", "regulasi", "tim", "kontak"].includes(currentPage) ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Info className="size-4" />
                    Tentang
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {aboutItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                      >
                        <Icon className="size-4 mr-2" />
                        {item.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={["ai-assistant", "dashboard"].includes(currentPage) ? "default" : "ghost"}
                    size="sm"
                    className="gap-2"
                  >
                    <Sparkles className="size-4" />
                    Tools
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {toolsItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                      >
                        <Icon className="size-4 mr-2" />
                        {item.label}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="h-6 w-px bg-border mx-1" />
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onNavigate("login")}
                className="gap-2"
              >
                <LogIn className="size-4" />
                Login
              </Button>
            </nav>
          </div>

          {/* Mobile Navigation */}
          <nav className="lg:hidden pb-3 flex gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate(item.id)}
                  className="gap-2 shrink-0"
                >
                  <Icon className="size-4" />
                  {item.label}
                </Button>
              );
            })}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={["tentang", "regulasi", "tim", "kontak", "ai-assistant", "dashboard", "login"].includes(currentPage) ? "default" : "ghost"}
                  size="sm"
                  className="gap-2 shrink-0"
                >
                  <Info className="size-4" />
                  Lainnya
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {aboutItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                    >
                      <Icon className="size-4 mr-2" />
                      {item.label}
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                {toolsItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                    >
                      <Icon className="size-4 mr-2" />
                      {item.label}
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate("login")}>
                  <LogIn className="size-4 mr-2" />
                  Login
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                  <Leaf className="size-5 text-primary-foreground" />
                </div>
                <span className="font-medium">Taman Kehati</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Platform konservasi keanekaragaman hayati Indonesia
              </p>
            </div>

            <div>
              <h4 className="mb-3 text-sm">Jelajahi</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => onNavigate("taman")} className="hover:text-primary">Taman Kehati</button></li>
                <li><button onClick={() => onNavigate("koleksi")} className="hover:text-primary">Koleksi Tanaman</button></li>
                <li><button onClick={() => onNavigate("peta")} className="hover:text-primary">Peta Interaktif</button></li>
                <li><button onClick={() => onNavigate("publikasi")} className="hover:text-primary">Publikasi</button></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm">Tentang</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => onNavigate("tentang")} className="hover:text-primary">Tentang Kami</button></li>
                <li><button onClick={() => onNavigate("regulasi")} className="hover:text-primary">Regulasi</button></li>
                <li><button onClick={() => onNavigate("tim")} className="hover:text-primary">Tim & Kolaborator</button></li>
                <li><button onClick={() => onNavigate("kontak")} className="hover:text-primary">Kontak</button></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm">Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => onNavigate("ai-assistant")} className="hover:text-primary">AI Assistant</button></li>
                <li><button onClick={() => onNavigate("dashboard")} className="hover:text-primary">Dashboard</button></li>
                <li><button onClick={() => onNavigate("login")} className="hover:text-primary">Login</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-6 text-center text-sm text-muted-foreground">
            <p>© 2024 Taman Kehati Indonesia. Konservasi untuk Keberlanjutan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
