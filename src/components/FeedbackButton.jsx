/**
 * FeedbackButton.jsx — Botão flutuante de feedback
 *
 * @author IFB NavAR Team
 */
import Icon from './Icon.jsx'

export default function FeedbackButton() {
  return (
    <a
      href="mailto:feedback@ifb.edu.br?subject=Feedback IFB NavAR"
      className="fixed bottom-5 right-5 z-40 bg-ifb-green text-white font-medium text-sm px-4 py-2.5 rounded-full shadow-soft hover:shadow-card-hover hover:bg-ifb-green-dark transition-all duration-200 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ifb-green/40"
    >
      <Icon name="chat" size={16} strokeWidth={2} />
      Feedback
    </a>
  )
}
