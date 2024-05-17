import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { styles } from "../../common/theme/styles";
import { IMAGES } from "../../assets/images";
import { HighlightPage } from "../onboarding/landing/highlightPage";
import { DotIndicator } from "../onboarding/landing/onboardingPager/dotIndicator";
import { SPACINGS } from "../../common/theme/spacing";
import { useTranslation } from "react-i18next";

const ONBOARDING_PAGES_COUNT = 4;

export const WelcomePager = () => {
  const { t } = useTranslation();
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
          detail={t("welcomeScreen.detail1")}
        />
        <HighlightPage
          key="2"
          title={t("welcomeScreen.step1")}
          image={IMAGES.illustration1}
          detail={t("welcomeScreen.detail2")}
          imageStyle={{ width: "60%" }}
        />
        <HighlightPage
          key="3"
          title={t("welcomeScreen.step2")}
          image={IMAGES.illustration2}
          detail={t("welcomeScreen.detail3")}
        />
        <HighlightPage
          key="4"
          title={t("welcomeScreen.step3")}
          image={IMAGES.illustration3}
          detail={t("welcomeScreen.detail4")}
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
    padding: SPACINGS.sm,
    ...styles.center,
  },
  container: {
    height: "80%",
    ...styles.center,
  },
});
