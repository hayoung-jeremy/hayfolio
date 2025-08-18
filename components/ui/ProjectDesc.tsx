import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface Props {
  title: string;
  description: string;
  visible: boolean;
  id: string;
}

const ProjectDescription = ({ title, description, visible, id }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const prevVisible = useRef(false);

  useLayoutEffect(() => {
    if (!containerRef.current || !titleRef.current || !descRef.current) return;

    // 이전 트윈/스플릿 정리
    gsap.killTweensOf([containerRef.current, titleRef.current, descRef.current]);

    const splitTitle = new SplitText(titleRef.current, { type: "chars", preserveSpaces: true });
    const splitDesc = new SplitText(descRef.current, { type: "chars", preserveSpaces: true });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (visible && prevVisible.current !== true) {
      gsap.set(containerRef.current, { autoAlpha: 1 });

      tl.fromTo(
        splitTitle.chars,
        { opacity: 0, y: 40, rotateX: 90, transformOrigin: "0% 50% -20px" },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.4, stagger: 0.03 }
      ).fromTo(
        splitDesc.chars,
        { opacity: 0, y: 30, rotateX: 90, transformOrigin: "0% 50% -20px" },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.015 },
        "<0.05"
      );
    } else if (!visible && prevVisible.current !== false) {
      tl.to(containerRef.current, { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
    }

    prevVisible.current = visible;

    return () => {
      tl.kill();
      splitTitle.revert();
      splitDesc.revert();
    };
  }, [visible]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none opacity-0 px-5 absolute top-0 left-0 xl:max-w-[840px]"
      id={id}
    >
      <p ref={titleRef} className="font-bold text-[20px] md:text-2xl xl:text-3xl">
        {title}
      </p>
      <p ref={descRef} className="mt-5 text-base xl:text-lg text-gray-300">
        {description}
      </p>
    </div>
  );
};

export default ProjectDescription;
