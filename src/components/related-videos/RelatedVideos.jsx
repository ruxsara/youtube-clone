import React, { useEffect, useState } from "react";
import { ChannelCard, RelatedVideoCard } from "../../components";
import { fetchRelatedVideos } from "../../api/FetchRelatedVideos";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Stack, Box, Pagination } from "@mui/material";

const RelatedVideos = () => {
  const initialValue = [
    // {
    //   type: "",
    //   videoId: "",
    //   title: "",
    //   lengthText: "",
    //   viewCount: "",
    //   thumbnail:[ {url:''}],
    //   authorThumbnail:[{url:''}],
    //   publishedTimeText: "",
    //   channelTitle: "",
    //   channelId: "",
    // },
  ];

  const [items, setItems] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState("");
  const { id } = useParams();

  const getMore = () => {
    fetchRelatedVideos(
      id,
      setIsLoading,
      setItems,
      setNextPageToken,
      nextPageToken
    );
  };

  useEffect(() => {
    getMore();
  }, [id]);

  return (
    <Box
      px={2}
      py={{ md: 1, xs: 5 }}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        gap={2}
        id="parentScrollRelatedVideosDiv"
        style={{
          height: "90vh",
        }}
      >
        <InfiniteScroll
          dataLength={items.length}
          next={getMore}
          hasMore={true}
          loader={<Pagination />}
          scrollableTarget="parentScrollRelatedVideosDiv"
        >
          {items.map((item, idx) => (
            <Box key={idx}>
              {item.videoId && <RelatedVideoCard video={item} />}
            </Box>
          ))}
        </InfiniteScroll>
      </Stack>
    </Box>
  );
};

export default RelatedVideos;
