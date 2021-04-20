// utils/index.js

import {
    createSolidDataset,
    getSolidDataset,
    saveSolidDatasetAt,
  } from "@inrupt/solid-client";
  
  export async function getOrCreateLocationList(containerUri, isMainUser, fetch) {
    const indexUrl = `${containerUri}favlocations.ttl`;
    try {
      /**
       * getSolidDataset: takes the URI of the dataset we want to get, plus an options 
       * object where we pass the fetch function. This is a function we get from the session, 
       * and it's used to make authenticated requests.
       */
      const locationsList = await getSolidDataset(indexUrl, { fetch });
      return locationsList;
    } catch (error) {
      if (error.statusCode === 404 && isMainUser) {
        /**
  * saveSolidDatasetAt: takes a URI as first param (which is where our dataset
  * will be saved), the dataset in question as second param (in this case a new, 
  * empty dataset), and the fetch function.
  */
        const locationsList = await saveSolidDatasetAt(
          indexUrl,
          /**
           * createSolidDataset: initializes a new dataset in memory.
           */
          createSolidDataset(),
          {
            fetch,
          }
        );
        return locationsList;
      } else {
        throw error;
      }
    }
  };