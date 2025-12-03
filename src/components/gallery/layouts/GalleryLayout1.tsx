"use client"
import { MediaGalleryBlockData, MediaGalleryItem } from '@/lib/mappers/mapGalleryBlock'
import { MasonryPhotoAlbum, Photo } from "react-photo-album";
import "react-photo-album/masonry.css";
import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import SafeHeading, { HeadingPosition, HeadingTag } from '@/components/safeHtml/SafeHeading';

// import photos from '@/lib/photos'; // <- you don't need this anymore
type GalleryPhoto = Photo & {
    caption?: string;
    kind: "Image" | "Video";
    videoUrl?: string;
};
const GalleryLayout1 = ({ block }: { block: MediaGalleryBlockData }) => {
    const [showToggle, setShowToggle] = React.useState(false);
    const [descriptionMaxLines, setDescriptionMaxLines] = React.useState(3);
    const [descriptionTextAlign, setDescriptionTextAlign] = React.useState<
        "start" | "end" | "center"
    >("center");

    // video controls
    const [controls, setControls] = React.useState(true);
    const [playsInline, setPlaysInline] = React.useState(true);
    const [autoPlay, setAutoPlay] = React.useState(false);
    const [loop, setLoop] = React.useState(false);
    const [muted, setMuted] = React.useState(false);
    const [disablePictureInPicture, setDisablePictureInPicture] =
        React.useState(false);
    const [disableRemotePlayback, setDisableRemotePlayback] =
        React.useState(false);
    const [controlsList, setControlsList] = React.useState<
        ("nodownload" | "nofullscreen" | "noremoteplayback")[]
    >([]);
    const [crossOrigin, setCrossOrigin] = React.useState("");
    const [preload, setPreload] = React.useState("");

    function mapItemsToPhotos(items: MediaGalleryItem[]): GalleryPhoto[] {
        return items
            .filter((item) =>
                // keep only items that can actually show something
                item.kind === "Image"
                    ? !!item.imageUrl
                    : !!item.videoUrl && !!item.posterUrl
            )
            .map((item) => {
                if (item.kind === "Image") {
                    return {
                        kind: "Image",
                        src: item.imageUrl!,              // thumbnail & full image
                        width: item.width ?? 1200,
                        height: item.height ?? 800,
                        alt: item.imageAltText || "",
                        caption: item.caption ?? "",
                    } as GalleryPhoto;
                }

                // VIDEO: use posterUrl as thumbnail, store videoUrl separately
                return {
                    kind: "Video",
                    src: item.posterUrl!,              // used for masonry thumb
                    width: item.width ?? 1200,
                    height: item.height ?? 800,
                    alt: item.caption || "Video",
                    caption: item.caption ?? "",
                    videoUrl: item.videoUrl!,          // used in Lightbox video slide
                } as GalleryPhoto;
            });
    }

    const { items } = block;
 

    const photos = mapItemsToPhotos(block.items);

    const [index, setIndex] = useState(-1);

    if (!photos.length) return null;

    const PlayIcon = () => (
        <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>
        </div>
    );

    return (
        <>
            <div className='headings mb-5 md:mb-10'>
                {
                    block?.heading && (
                        <SafeHeading
                            className={`text-4xl md:text-5xl md:leading-[60px] font-semibold max-w-xxl mt-5 mb-5 relative`}
                            as={block?.headingTag?.[0] as HeadingTag ?? "h2"}
                            position={(block?.headingPosition?.[0] as HeadingPosition) ?? "Left"}

                            style={{ color: "inherit" }}
                            html={block.heading}

                        />
                    )
                }
               

            </div>
            <div>
                <MasonryPhotoAlbum
                    photos={photos}
                    onClick={({ index }) => setIndex(index)}
                    columns={(containerWidth) => {
                        if (containerWidth < 640) return 2;     // mobile
                        if (containerWidth < 1024) return 3;    // tablet
                        return 4;                               // desktop
                    }}
                    spacing={16}
                    render={{
                        extras: (_, { photo }) =>
                            photo.kind === "Video" ? <PlayIcon /> : null,
                    }}
                />

                <Lightbox
                    open={index >= 0}
                    close={() => setIndex(-1)}
                    index={index}
                    slides={photos.map((p) =>
                        p.kind === "Video"
                            ? {
                                type: "video",
                                sources: [{ src: p.videoUrl!, type: "video/mp4" }],
                                // poster: p.src,                
                                description: p.caption,
                                autoPlay: true,   // ✅ autoplay video
                                muted: true,      // ✅ browsers allow autoplay only if muted
                            }
                            : {
                                src: p.src,
                                alt: p.alt,
                                description: p.caption,
                            }
                    )}
                    plugins={[Captions, Video]}
                    carousel={{ finite: true }}

                    className="[--yarl__color_backdrop:rgba(0,0,0,0.6)]"
                />
            </div>
        </>

    );
};

export default GalleryLayout1;
