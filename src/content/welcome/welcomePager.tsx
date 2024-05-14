import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { styles } from "../../common/theme/styles";
import { IMAGES } from "../../assets/images";
import { HighlightPage } from "../onboarding/landing/highlightPage";
import { DotIndicator } from "../onboarding/landing/onboardingPager/dotIndicator";

const ONBOARDING_PAGES_COUNT = 4;

export const WelcomePager = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <PagerView
        style={style.container}
        initialPage={0}
        onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
      >
        <HighlightPage
          key="1"
          image={IMAGES.illustration5}
          detail="Show your child they can do it, with a pep talk from themselves!"
        />
        <HighlightPage
          key="2"
          title="Step 1"
          image={IMAGES.illustration1}
          detail="Use the app camera or import video from your phone."
          imageStyle={{ width: "60%" }}
        />
        <HighlightPage
          key="3"
          title="Step 2"
          image={IMAGES.illustration2}
          detail="Add stickers or voiceover to the video recording."
        />
        <HighlightPage
          key="4"
          title="Step 3"
          image={IMAGES.illustration3}
          detail="Play back the pep talk for a boost of confidence!"
          imageStyle={{ width: "60%" }}
        />
      </PagerView>
      <DotIndicator
        containerStyle={style.WelcomeContainer}
        currentIndex={currentIndex}
        count={ONBOARDING_PAGES_COUNT}
      />
    </>
  );
};

const style = StyleSheet.create({
  WelcomeContainer: {
    padding: 10,
    ...styles.center,
  },
  container: {
    // ...styles.flex,
    height: "80%",
    // backgroundColor: "red",
    ...styles.center,
  },
});
