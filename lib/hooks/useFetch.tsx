import { useEffect, useState } from "react";
import { Alert } from "react-native";

export const useFetch = (fn: any) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();
  return { data, loading, refetch };
};
