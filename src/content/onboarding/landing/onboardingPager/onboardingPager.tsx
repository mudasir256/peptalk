import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { DotIndicator } from "./dotIndicator";
import { styles } from "../../../../common/theme/styles";
import { WelcomePage } from "../welcomePage";
import { HighlightPage } from "../highlightPage";
import { IMAGES } from "../../../../assets/images";
import { useTranslation } from "react-i18next";

const ONBOARDING_PAGES_COUNT = 6;

export const OnboardingPager = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <PagerView
        style={styles.flex}
        initialPage={0}
        onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
      >
        <WelcomePage />
        <HighlightPage
          key="1"
          image={IMAGES.illustration0}
          detail={t("landingScreen.detail1")}
        />
        <HighlightPage
          key="2"
          title={t("landingScreen.step1")}
          image={IMAGES.illustration1}
          detail={t("landingScreen.detail2")}
          imageStyle={{ width: "60%" }}
        />
        <HighlightPage
          key="3"
          title={t("landingScreen.step2")}
          image={IMAGES.illustration2}
          detail={t("landingScreen.detail3")}
        />
        <HighlightPage
          key="4"
          title={t("landingScreen.step3")}
          image={IMAGES.illustration3}
          detail={t("landingScreen.detail4")}
          imageStyle={{ width: "60%" }}
        />
        <HighlightPage
          key="5"
          image={IMAGES.illustration4}
          detail={t("landingScreen.detail5")}
          detailStyle={style.detailStyle}
        />
      </PagerView>
      <DotIndicator
        containerStyle={{ padding: 10, ...styles.center }}
        currentIndex={currentIndex}
        count={ONBOARDING_PAGES_COUNT}
      />
    </>
  );
};

const style = StyleSheet.create({
  detailStyle: {
    fontSize: 34,
  },
});
