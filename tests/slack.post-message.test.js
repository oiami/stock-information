const slack = require("../util/slack-post-message");

describe("slack function", () => {
  
  const expectMsg = (msg) => {
    expect(Object.keys(msg)).toEqual(expect.arrayContaining(["type", "text"]));
    expect(msg.text.text).not.toBeNull();
  };
  
  describe("summary content section", () => {
    const summary = [
      {
        date: "02.01.18",
        close: 172.26,
        max: 172.3,
        min: 169.26
      },
      {
        date: "03.01.18",
        close: 172.23,
        max: 174.55,
        min: 171.96
      }
    ];
    
    it("should return summary data section", () => {
      const msg = slack.summaryContent("Apple Inc.", summary);
      msg.forEach(item => {
        expectMsg(item);
      });
    });
  });
  
  describe("drawdown content section", () => {
    const drawdown = [
      {
        date: "02.01.18",
        close: 172.26,
        max: 172.3,
        min: 169.26,
        drawdown: "1.8"
      },
      {
        date: "03.01.18",
        close: 172.23,
        max: 174.55,
        min: 171.96,
        drawdown: "1.5"
      },
      {
        date: "05.01.18",
        close: 175,
        max: 175.37,
        min: 173.05,
        drawdown: "1.3"
      }
    ];
    
    it("should return drawdown section", () => {
      const msg = slack.drawdownContent(drawdown);
      msg.forEach(item => {
        expectMsg(item);
      });
    });
  });
  
  describe("return value section", () => {
    const ret = {
        startDate: "02.01.18",
        endDate: "05.01.18",
        fromValue: 172.26,
        toValue: 175,
        rate: 2.740000000000009,
        percent: "+1.6"
      }
    ;
    
    it("should return drawdown section", () => {
      const msg = slack.returnContent(ret);
      expectMsg(msg);
    });
  });
});
