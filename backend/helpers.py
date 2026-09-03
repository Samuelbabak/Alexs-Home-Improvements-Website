
from html import escape

def build_email_body(name, email, phone, service, message_html, address, budget, attachment_links):
    message_html = escape(message).replace("\r\n", "<br>").replace("\n", "<br>")


    return f"""<!doctype html>
    <html>
        <body style="margin:0;background-color:#f2f4f7;color:#1f2933;font-family:Arial,Helvetica,sans-serif;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f7;padding:28px 12px;">
                <tr>
                    <td align="center">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background-color:#ffffff;border:1px solid #d9dee7;">
                            <tr>
                                <td style="padding:20px 24px;border-bottom:5px solid #c58a3a;">
                                    <img src="https://alexshomeimprovements.com/media/medium-horizontal.png"
                                            width="170" alt="Alex's Home Improvements"
                                            style="display:block;width:170px;height:auto;">
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:28px 24px 8px;">
                                    <p style="margin:0 0 6px;color:#c58a3a;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;">Website inquiry</p>
                                    <h1 style="margin:0;color:#0b2a5b;font-size:26px;line-height:1.25;">New estimate request</h1>
                                    <p style="margin:8px 0 0;color:#68737f;font-size:14px;">A prospective customer submitted a project request.</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:16px 24px;">
                                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
                                        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#68737f;width:30%;">Name</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:bold;">{escape(name)}</td></tr>
                                        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#68737f;">Email</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;"><a href="mailto:{escape(str(email))}" style="color:#0b2a5b;">{escape(str(email))}</a></td></tr>
                                        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#68737f;">Phone</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;"><a href="tel:{escape(phone)}" style="color:#0b2a5b;">{escape(phone)}</a></td></tr>
                                        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#68737f;">Address</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">{escape(address or 'Not provided')}</td></tr>
                                        <tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#68737f;">Service</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:bold;">{escape(service)}</td></tr>
                                        <tr><td style="padding:10px 0;color:#68737f;">Budget</td><td style="padding:10px 0;font-weight:bold;">{escape(budget or 'Not provided')}</td></tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:8px 24px 24px;">
                                    <div style="padding:18px;background-color:#f7f8fa;border-left:4px solid #c58a3a;">
                                        <h2 style="margin:0 0 8px;color:#0b2a5b;font-size:17px;">Project details</h2>
                                        <p style="margin:0;font-size:14px;line-height:1.6;">{message_html}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0 24px 28px;font-size:14px;line-height:1.6;">
                                    <strong style="color:#0b2a5b;">Attachments ({len(stored_attachments)})</strong><br>
                                    {attachment_links}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:18px 24px;background-color:#0b2a5b;color:#ffffff;font-size:12px;">
                                    Alex's Home Improvements &nbsp;|&nbsp; Asheville, Leicester, and surrounding Buncombe County
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>"""
