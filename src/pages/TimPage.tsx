import { Users, Mail, Building2, Sparkles, Globe } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockTeamMembers, mockCollaborators } from '../mocks/team';

interface NavigateFunction {
  (page: string, slug?: string): void;
}

interface TimPageProps {
  onNavigate: NavigateFunction;
}

const collaboratorTypeLabels: Record<string, string> = {
  pemerintah: 'Pemerintah',
  universitas: 'Universitas',
  lsm: 'LSM',
  internasional: 'Internasional'
};

const collaboratorTypeColors: Record<string, string> = {
  pemerintah: 'bg-primary text-primary-foreground',
  universitas: 'bg-chart-1 text-white',
  lsm: 'bg-secondary text-secondary-foreground',
  internasional: 'bg-chart-2 text-primary'
};

export function TimPage({ onNavigate }: TimPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-10 h-10" />
            <h1>Tim & Kolaborator</h1>
          </div>
          <p className="text-primary-foreground/90">
            Kenali tim pengembang dan mitra kolaborasi Taman Kehati Indonesia
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <Tabs defaultValue="team" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 mb-6">
            <TabsTrigger value="team">Tim Pengembang</TabsTrigger>
            <TabsTrigger value="collaborators">Kolaborator</TabsTrigger>
          </TabsList>

          {/* Team Members */}
          <TabsContent value="team" className="space-y-6">
            <Card className="p-6 bg-chart-1/5 border-chart-1/20">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-chart-1 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="mb-2">Tim Multidisiplin</h3>
                  <p className="text-sm text-muted-foreground">
                    Platform Taman Kehati Indonesia dikembangkan oleh tim multidisiplin yang terdiri dari 
                    ahli ekologi, botani, sistem informasi geografis, dan teknologi informasi dari berbagai 
                    institusi terkemuka di Indonesia.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTeamMembers.map(member => (
                <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow">
                  {/* Profile Image Placeholder */}
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12 text-primary" />
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="mb-1">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                    <Badge variant="outline" className="text-xs">
                      {member.organization}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 text-center">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-2 text-center">Keahlian:</div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.expertise.map(exp => (
                        <Badge key={exp} variant="secondary" className="text-xs">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {member.email && (
                    <div className="pt-4 border-t border-border">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => window.location.href = `mailto:${member.email}`}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Kontak
                      </Button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Collaborators */}
          <TabsContent value="collaborators" className="space-y-6">
            <Card className="p-6 bg-chart-2/5 border-chart-2/20">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-chart-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="mb-2">Jaringan Kolaborasi</h3>
                  <p className="text-sm text-muted-foreground">
                    Taman Kehati Indonesia bekerja sama dengan berbagai institusi pemerintah, universitas, 
                    LSM, dan organisasi internasional untuk memperkuat upaya konservasi keanekaragaman hayati.
                  </p>
                </div>
              </div>
            </Card>

            {/* Group by type */}
            {(['pemerintah', 'universitas', 'lsm', 'internasional'] as const).map(type => {
              const collaboratorsOfType = mockCollaborators.filter(c => c.type === type);
              if (collaboratorsOfType.length === 0) return null;

              return (
                <div key={type}>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className={collaboratorTypeColors[type]}>
                      {collaboratorTypeLabels[type]}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      ({collaboratorsOfType.length} mitra)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {collaboratorsOfType.map(collab => (
                      <Card key={collab.id} className="p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="mb-2">{collab.name}</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {collab.description}
                            </p>
                            {collab.website && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => window.open(collab.website, '_blank')}
                              >
                                <Globe className="w-4 h-4 mr-2" />
                                Website
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <Card className="p-8 mt-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
          <Users className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="mb-3">Bergabung dengan Kami</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Tertarik untuk berkolaborasi dalam upaya konservasi keanekaragaman hayati Indonesia? 
            Kami terbuka untuk kerjasama penelitian, pertukaran data, dan program konservasi bersama.
          </p>
          <Button 
            size="lg"
            onClick={() => onNavigate('kontak')}
          >
            Hubungi Kami
          </Button>
        </Card>
      </div>
    </div>
  );
}
