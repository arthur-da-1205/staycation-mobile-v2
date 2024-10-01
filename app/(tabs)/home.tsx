import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { map } from "lodash-es";
import { Button } from "native-base";

import { useApp } from "@provider/app.provider";
import { useGetAccommodationList } from "@resources/gql/accommodation.gql";
import { AccommodationModel } from "@resources/model/accommodation.model";

const Home = () => {
  const { setLogout, user } = useApp();

  const [getAccommodation] = useGetAccommodationList();

  const [accommodationData, setAccommodationData] = useState<(typeof AccommodationModel)[] | null>([]);

  useEffect(() => {
    getAccommodation().then((res) => {
      if (res.items) setAccommodationData(res.items);

      if (res.error) console.log(res.error);
    });
  }, []);

  return (
    <View>
      <ActivityIndicator size={"large"} color={"green"} />
      <Text>Home</Text>
      <Text>{user?.name}</Text>
      {accommodationData && accommodationData?.length > 0 ? (
        map(accommodationData, (item, idx) => <Text key={idx}>{item.name}</Text>)
      ) : (
        <Text>Not found</Text>
      )}
      <Button onPress={() => setLogout()}>Sign Out</Button>
    </View>
  );
};

export default Home;
