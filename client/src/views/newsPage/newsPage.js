import React, { Fragment, useState, useEffect } from 'react';
import { Box, Link, LinearProgress } from '@mui/material';

//Card
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

//InfiniteScroll
import InfiniteScroll from 'react-infinite-scroll-component';

//appbar
import MenuBar from '../../components/Shared/Components/MenuBar.js';

// Note: Removed the old makeStyles hook and the JSS style imports.

export default function Cards(props) {
  document.body.style.background = "#ececec";
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // This function fetches data and appends it to the items state.
  const fetchMoreData = async () => {
    try {
      const response = await fetch(`/api/newsgrabber?page=${page}`);
      const body = await response.json();

      if (response.status !== 200) {
        throw new Error(body.message);
      }

      const newElements = body.map((item, index) => (
        <Card style={{ background: "white" }} key={index}>
          <CardBody>
            <Link href={item.link} color="inherit" target="_blank" rel="noopener">
              {item.title}
            </Link>
          </CardBody>
        </Card>
      ));

      setItems(prevItems => [...prevItems, ...newElements]);
      setPage(prevPage => prevPage + 1);

      if (body.length < 50) { // Assuming 50 is the page size from the API
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <Fragment>
      <MenuBar />
      <Box sx={(theme) => ({ ...theme.mixins.toolbar })} />
      <Box sx={{ width: '70%', marginLeft: 'auto', marginRight: 'auto', display: "block" }}>
        <Box component="h1" sx={{ textAlign: "center", fontSize: '2.5rem' }}>
          Covid-19 News Feed
        </Box>
        <Box component="h3" sx={{ textAlign: "center" }}>
          Updated Daily
        </Box>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<LinearProgress />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>No more results</b>
            </p>
          }
        >
          {items}
        </InfiniteScroll>
      </Box>
    </Fragment>
  );
}