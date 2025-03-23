import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()

    // Simple response logic based on keywords
    let response = ""

    if (message.toLowerCase().includes("budget")) {
      response =
        "Creating a budget is a great first step! Start by tracking all your income and expenses for a month. Then, categorize your spending and look for areas to cut back. The 50/30/20 rule is a good guideline: 50% for needs, 30% for wants, and 20% for savings and debt repayment."
    } else if (message.toLowerCase().includes("invest")) {
      response =
        "For beginners, I recommend starting with a retirement account like a 401(k) or IRA. Then consider low-cost index funds which provide diversification. Remember to only invest money you won't need in the short term, and consider your risk tolerance when choosing investments."
    } else if (message.toLowerCase().includes("credit score")) {
      response =
        "To improve your credit score: 1) Pay all bills on time, 2) Keep credit card balances below 30% of your limit, 3) Don't close old accounts, 4) Limit applications for new credit, and 5) Regularly check your credit report for errors."
    } else if (message.toLowerCase().includes("debt") && message.toLowerCase().includes("save")) {
      response =
        "It's often best to do both! First, build a small emergency fund ($1,000), then focus on high-interest debt (like credit cards), while still contributing to retirement if your employer matches. Once high-interest debt is paid, build your emergency fund to 3-6 months of expenses while tackling lower-interest debt."
    } else {
      response =
        "That's a great question about personal finance. While I'm still learning, I'd recommend checking out our resources section for more detailed information on this topic. Would you like me to help with something else?"
    }

    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

