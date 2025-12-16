import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Eye,
  Clock,
  User,
  Film,
  BookOpen,
  Sparkles,
  SkipBack,
  SkipForward,
  Settings,
  Captions,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Media } from "@/types/media";
import { cn } from "@/lib/utils";

const typeIcons: Record<string, React.ReactNode> = {
  "short-film": <Film className="w-4 h-4" />,
  "educational": <BookOpen className="w-4 h-4" />,
  "content": <Sparkles className="w-4 h-4" />,
};

const typeColors: Record<string, string> = {
  "short-film": "bg-warm text-warm-foreground",
  "educational": "bg-safe text-safe-foreground",
  "content": "bg-hope text-hope-foreground",
};

const MediaDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showPlaybackOptions, setShowPlaybackOptions] = useState(false);

  // Video control handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedData = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsVideoLoading(false);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (!isMuted) {
        setVolume(0);
      } else {
        setVolume(0.8);
        videoRef.current.volume = 0.8;
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatVideoTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying && !showPlaybackOptions) {
          setShowControls(false);
        }
      }, 3000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isPlaying, showPlaybackOptions]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'KeyF':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleMute();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skip(-10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          skip(10);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlay, toggleMute, toggleFullscreen, skip]);

  const { data: media, isLoading } = useQuery({
    queryKey: ['media', slug],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/media/slug/${slug}`);
      if (!response.ok) throw new Error('Failed to fetch media');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">Loading media...</div>
        </div>
      </MainLayout>
    );
  }

  if (!media) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Media Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The media you're looking for doesn't exist.
          </p>
          <Button asChild variant="hero">
            <Link to="/media">Back to Media Hub</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Media link has been copied to your clipboard.",
    });
  };

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(media.title);

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container-padding mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/media")}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Media Hub
            </Button>

            <Badge variant="secondary" className="mb-4 capitalize">
              {media.type === "short-film" ? "Short Film" : media.type === "educational" ? "Educational" : "Content"}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              {media.title}
            </h1>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{media.creator}</p>
                  <p className="text-sm text-muted-foreground">Creator</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{formatViews(media.views)}</p>
                  <p className="text-sm text-muted-foreground">Views</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">{media.duration}</p>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  {typeIcons[media.type]}
                </div>
                <div>
                  <p className="font-medium text-foreground capitalize">
                    {media.type.replace("-", " ")}
                  </p>
                  <p className="text-sm text-muted-foreground">Type</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Media Content */}
      <article className="py-12 md:py-16 bg-background">
        <div className="container-padding mx-auto max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Enhanced Video Player */}
              {media.videoUrl && (
                <div className="mb-8">
                  <div
                    ref={containerRef}
                    className="relative aspect-video bg-black rounded-2xl overflow-hidden group"
                    onDoubleClick={toggleFullscreen}
                  >
                    {/* Loading Overlay */}
                    {isVideoLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                      </div>
                    )}

                    {/* Video Element */}
                    <video
                      ref={videoRef}
                      controls={false}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedData={handleLoadedData}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => setIsPlaying(false)}
                      onContextMenu={(e) => e.preventDefault()}
                      poster={media.thumbnailUrl ? `${import.meta.env.VITE_API_BASE_URL}${media.thumbnailUrl}` : undefined}
                      className="w-full h-full object-contain"
                      preload="metadata"
                      playsInline
                    >
                      <source src={`${import.meta.env.VITE_API_BASE_URL}${media.videoUrl}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Custom Controls Overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-300",
                        showControls ? "opacity-100" : "opacity-0"
                      )}
                    >
                      {/* Top Bar */}
                      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate("/media")}
                          className="text-white hover:bg-white/20 backdrop-blur-sm"
                        >
                          <ArrowLeft className="w-4 h-4 mr-2" />
                          Back
                        </Button>

                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="backdrop-blur-sm bg-black/50 text-white">
                            {media.type === "short-film" ? "Short Film" : media.type === "educational" ? "Educational" : "Content"}
                          </Badge>
                        </div>
                      </div>

                      {/* Center Play Button */}
                      <button
                        onClick={togglePlay}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors group"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-white" />
                        ) : (
                          <Play className="w-8 h-8 text-white ml-1" />
                        )}
                      </button>

                      {/* Bottom Controls */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                        {/* Progress Bar */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-white/80 font-medium min-w-[45px]">
                            {formatVideoTime(currentTime)}
                          </span>
                          <Slider
                            value={[currentTime]}
                            max={duration}
                            step={0.1}
                            onValueChange={handleSeek}
                            className="flex-1"
                          />
                          <span className="text-xs text-white/80 font-medium min-w-[45px]">
                            {formatVideoTime(duration)}
                          </span>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {/* Play/Pause */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={togglePlay}
                              className="text-white hover:bg-white/20"
                            >
                              {isPlaying ? (
                                <Pause className="w-5 h-5" />
                              ) : (
                                <Play className="w-5 h-5" />
                              )}
                            </Button>

                            {/* Skip Back */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => skip(-10)}
                              className="text-white hover:bg-white/20"
                            >
                              <SkipBack className="w-5 h-5" />
                            </Button>

                            {/* Skip Forward */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => skip(10)}
                              className="text-white hover:bg-white/20"
                            >
                              <SkipForward className="w-5 h-5" />
                            </Button>

                            {/* Volume */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleMute}
                                className="text-white hover:bg-white/20"
                              >
                                {isMuted || volume === 0 ? (
                                  <VolumeX className="w-5 h-5" />
                                ) : (
                                  <Volume2 className="w-5 h-5" />
                                )}
                              </Button>
                              <Slider
                                value={[volume]}
                                max={1}
                                step={0.01}
                                onValueChange={handleVolumeChange}
                                className="w-24"
                              />
                            </div>

                            {/* Current Time */}
                            <span className="text-sm text-white/80 font-medium ml-4">
                              {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Playback Speed */}
                            <div className="relative">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowPlaybackOptions(!showPlaybackOptions)}
                                className="text-white hover:bg-white/20"
                              >
                                <Settings className="w-5 h-5" />
                              </Button>

                              {showPlaybackOptions && (
                                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-2 min-w-[120px] z-50">
                                  {playbackRates.map((rate) => (
                                    <button
                                      key={rate}
                                      onClick={() => {
                                        if (videoRef.current) {
                                          videoRef.current.playbackRate = rate;
                                          setPlaybackRate(rate);
                                        }
                                        setShowPlaybackOptions(false);
                                      }}
                                      className={cn(
                                        "w-full text-left px-3 py-2 text-sm rounded hover:bg-white/20 transition-colors",
                                        playbackRate === rate ? "text-primary font-medium" : "text-white/80"
                                      )}
                                    >
                                      {rate}x Speed
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Fullscreen */}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={toggleFullscreen}
                              className="text-white hover:bg-white/20"
                            >
                              {isFullscreen ? (
                                <Minimize className="w-5 h-5" />
                              ) : (
                                <Maximize className="w-5 h-5" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Keyboard Shortcuts Hint */}
                      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3 text-xs text-white/70 space-y-1">
                          <div className="flex items-center gap-2">
                            <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">Space</kbd>
                            <span>Play/Pause</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">F</kbd>
                            <span>Fullscreen</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs">M</kbd>
                            <span>Mute</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Double Click Hint */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1 text-xs text-white/60">
                        <Maximize className="w-3 h-3" />
                        <span>Double click for fullscreen</span>
                      </div>
                    </div>
                  </div>

                  {/* Video Stats */}
                  <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{formatViews(media.views)} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{media.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{media.creator}</span>
                      </div>
                    </div>
                    <div className="text-xs">
                      Published on {formatDate(media.createdAt)}
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed
                prose-li:text-muted-foreground
                prose-strong:text-foreground
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              >
                <p className="text-lg leading-relaxed">{media.description}</p>
              </div>
            </motion.div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-24 h-fit space-y-8">
              {/* Share */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Media
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full"
                  >
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full"
                  >
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                    className="rounded-full"
                  >
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyLink}
                    className="rounded-full"
                    aria-label="Copy link"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Media Details */}
              <div className="bg-muted/50 rounded-xl p-6">
                <h3 className="font-display font-bold text-foreground mb-4">
                  Media Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm">{media.creator}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="text-sm">{formatViews(media.views)} views</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">{media.duration}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                      {typeIcons[media.type]}
                    </div>
                    <Badge variant="secondary" className={`capitalize ${typeColors[media.type] || "bg-muted text-muted-foreground"}`}>
                      {media.type.replace("-", " ")}
                    </Badge>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Published on {formatDate(media.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container-padding mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-4">
            Explore More Content
          </h2>
          <p className="text-muted-foreground mb-6">
            Discover inspiring short films, educational content, and community-driven ideas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/media">View All Media</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/get-involved">Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default MediaDetail;