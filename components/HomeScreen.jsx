import React, { useState } from "react";
import RenderItem from "../src_components/RenderItem";
import {View,} from "react-native";

const HomeScreen = () => {

  return (
    <View style={{ flex: 1 }}>
    <RenderItem/>
    </View>
  );
};


export default HomeScreen;
