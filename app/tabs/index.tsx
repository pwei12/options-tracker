import ExpiringOptionsList from "@/components/ExpiringOptionsList";
import HomeSummaryCard from "@/components/HomeSummaryCard";
import LatestOptionsList from "@/components/LatestOptionsList";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <HomeSummaryCard />
      <ExpiringOptionsList />
      <LatestOptionsList />
    </SafeAreaView>
  );
}
