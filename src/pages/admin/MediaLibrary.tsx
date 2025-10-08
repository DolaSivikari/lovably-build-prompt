import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, Search, Image, FileText, File, Trash2, Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const MediaLibrary = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedFile, setSelectedFile] = useState<any>(null);

  useEffect(() => {
    checkAuth();
    loadFiles();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const loadFiles = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.storage
      .from("project-images")
      .list();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load files",
        variant: "destructive",
      });
    } else {
      setFiles(data || []);
    }
    setIsLoading(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("project-images")
      .upload(fileName, file);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
      loadFiles();
    }
    setIsUploading(false);
  };

  const handleDelete = async (fileName: string) => {
    const { error } = await supabase.storage
      .from("project-images")
      .remove([fileName]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      loadFiles();
      setSelectedFile(null);
    }
  };

  const getFileIcon = (name: string) => {
    const ext = name.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return Image;
    if (['pdf'].includes(ext || '')) return FileText;
    return File;
  };

  const getFileUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "URL copied to clipboard",
    });
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || file.name.toLowerCase().endsWith(`.${filterType}`);
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Media Library
            </h1>
          </div>
          <div className="flex gap-2">
            <label htmlFor="file-upload">
              <Button disabled={isUploading} asChild>
                <span className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? "Uploading..." : "Upload"}
                </span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*,.pdf"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="jpg">Images (JPG)</SelectItem>
              <SelectItem value="png">Images (PNG)</SelectItem>
              <SelectItem value="pdf">Documents (PDF)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading files...</div>
        ) : filteredFiles.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No files found. Upload your first file to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* File Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.name);
                const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(
                  file.name.split('.').pop()?.toLowerCase() || ''
                );
                
                return (
                  <Card
                    key={file.name}
                    className={`cursor-pointer hover:shadow-lg transition-all ${
                      selectedFile?.name === file.name ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedFile(file)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        {isImage ? (
                          <img
                            src={getFileUrl(file.name)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FileIcon className="h-12 w-12 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-xs font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.metadata?.size / 1024).toFixed(0)} KB
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Selected File Details */}
            {selectedFile && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Selected: {selectedFile.name}</h3>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(getFileUrl(selectedFile.name))}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy URL
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(getFileUrl(selectedFile.name), '_blank')}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(selectedFile.name)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MediaLibrary;
