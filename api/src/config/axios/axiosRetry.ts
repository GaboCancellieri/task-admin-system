import axiosRetry from "axios-retry";
import tasksTitleAPI from "../../utils/tasksTitleAPI";

export default axiosRetry(tasksTitleAPI, {
  retries: 5,
  retryDelay: (retryCount: number) => retryCount * 1000,
});
