import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { DotIndicator } from "./dotIndicator";
import { styles } from "../../../../common/theme/styles";
import { WelcomePage } from "../welcomePage";
import { HighlightPage } from "../highlightPage";
import { IMAGES } from "../../../../assets/images";

const ONBOARDING_PAGES_COUNT = 6

export const OnboardingPager = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <>
      <PagerView style={styles.flex} initialPage={0} onPageSelected={e => setCurrentIndex(e.nativeEvent.position)}>
        <WelcomePage/>
        <HighlightPage key="1" image={IMAGES.illustration0} detail="Show your child they can do it, with a pep talk from themselves!" />
        <HighlightPage key="2" title="Step 1" image={IMAGES.illustration1} detail="Use the app camera or import video from your phone." />
        <HighlightPage key="3" title="Step 2" image={IMAGES.illustration2} detail="Add stickers or voiceover to the video recording." />
        <HighlightPage key="4" title="Step 3" image={IMAGES.illustration3} detail="Play back the pep talk for a boost of confidence!" />
        <HighlightPage key="5" image={IMAGES.illustration4} detail="You’ve got this!" detailStyle={style.detailStyle} />
      </PagerView>
      <DotIndicator containerStyle={{padding: 10, ...styles.center}} currentIndex={currentIndex} count={ONBOARDING_PAGES_COUNT}/>
    </>
  )
}

const style = StyleSheet.create({
  detailStyle: {
    fontSize: 34
  }
})