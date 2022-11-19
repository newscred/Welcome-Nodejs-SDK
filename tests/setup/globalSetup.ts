import { disableNetConnect } from "nock";

module.exports = function () {
  disableNetConnect();
};
