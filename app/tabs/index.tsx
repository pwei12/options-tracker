import HomeSummaryCard from "@/components/HomeSummaryCard";
import LatestOptionsList from "@/components/LatestOptionsList";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeSummaryCard />
      <LatestOptionsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
});
