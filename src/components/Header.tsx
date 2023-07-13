"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    setOpen(false);
    setDropOpen(false);
  }, [path]);

  return (
    <div className="em__main">
      <div className="em__nav">
        <div className="em__top">
          <div className="container">
            <div className="inner">
              <div className="em__side">
                <div className="right">
                  <div className="flex items-center gap-2">
                    <span>EN</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                    >
                      <image
                        id="downward-arrow_1_"
                        data-name="downward-arrow (1)"
                        width="10"
                        height="6"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAaUlEQVQImX3OIRKCYBiE4QeGYLF4CE5AsGkgGb2AcjSG6gyQTAaiweMYnXG+8DsE5E27s2/YrDw0N+zwtswGnwIdhj9S4ppjRLUi1WhDDF7YL0gnPCIkMXjiOOtn3FOJj3MmXLBF/xvwBd5MDQUMYfROAAAAAElFTkSuQmCC"
                      />
                    </svg>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>USD</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                    >
                      <image
                        id="downward-arrow_1_"
                        data-name="downward-arrow (1)"
                        width="10"
                        height="6"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAaUlEQVQImX3OIRKCYBiE4QeGYLF4CE5AsGkgGb2AcjSG6gyQTAaiweMYnXG+8DsE5E27s2/YrDw0N+zwtswGnwIdhj9S4ppjRLUi1WhDDF7YL0gnPCIkMXjiOOtn3FOJj3MmXLBF/xvwBd5MDQUMYfROAAAAAElFTkSuQmCC"
                      />
                    </svg>
                  </div>
                </div>
                <div className="left">
                  {status === "authenticated" && (
                    <div onClick={() => signOut()} title="Logout">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                    </div>
                  )}

                  <div
                    title="User"
                    onClick={() =>
                      status === "authenticated"
                        ? router.push("/account")
                        : router.push("/auth/signin")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <image
                        id="user_14_"
                        data-name="user (14)"
                        width="20"
                        height="20"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABjUlEQVQ4jaXUwYuOURTH8c/MEDJEs7WTWVnZKMKGRMKGLGYKSWLBgn9AKQsipuyksMCClKghLEYWlrOxU6hJSklDJDo5b2Oee9/nnZpf3Z6655zvPc8599y+4S2HtOgYTmN1urzDRYx1C1lQ7MzoJTbjNx7iD3bgKkawCb+aQf0F5p/GE3YmD92DvViEk1iP50VUF+DWXPFrFworV3AOG7GraazV8Am2h61AzVaU4FWCWzNch6/FbqkP6TtLNeA3LCx2Sy1N357A6OiS/65KTauwEg/mAjyf38eFZUYd29m5AKdwAGvwJjs5lGsnXmMtopvvm8G1Lnf0KAE1PcW2yn51UvbhOgbxCZP4nLahzC7u6Xccwe024CWcSudI/S6mGz6L89AYwVvYgBO1Gl5O2D0sw40KLPQDN7EigcdxrZnh7pzR+9hfILprFAP5Kr3AnU5TfuYa7Brari9YHgPRnxnFZBxtDWnX4SzfwchwIgvb6zHopXgsJoMasI/zhIXexpUKYHQtHtT56hmm/wJ4n0o+FtRuXgAAAABJRU5ErkJggg=="
                      />
                    </svg>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="14"
                      height="18"
                      viewBox="0 0 14 18"
                    >
                      <image
                        id="bag"
                        width="14"
                        height="18"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAASCAYAAABrXO8xAAABH0lEQVQ4jZXTuy5EURTG8d8wFZkxhcQlElFQ6SSUaNR4ASHRqjyARiQ8gQi9jpJaaMQTUKlcIowpMHHJjn2Sk3PmyPiSneys9f3PWWvtvUtj08syGsARJmP4CvO4TdvKGagb1/jAKr6whRv046kI3EVX/ECiA3xjHwtJsCMDLkRjVnuYa1XqBDbj31YwniGTfk+wgYsAjuAS99iOhpkMuINPLOEco6HUxZjswymeMZVZjzjDYNJSOZaXaBhDuQ5/Y424D4OqlOMEm6kJthrOWmr/hmootYr3nLVY4YxrCdgstOXVSIONXLpY9dBjAr4U2vKqp3us59JtgBW8/hPsCWAvHv4B3gUmgLV4qO0qPLXOcAEO4/Vaj8G/VMIsjn8A8jA2OVIwEgoAAAAASUVORK5CYII="
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="em__main">
          <div className="container">
            <div className="flex em__align__center">
              <div className="em__body__wrapper">
                <div className="em__inner">
                  <div className="em__right">
                    <ul>
                      <li>
                        <a href="#about">About</a>
                      </li>
                      <li className="relative">
                        <div
                          onClick={() => setDropOpen(!dropOpen)}
                          className="flex items-center"
                        >
                          <span>Event Essentials </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                          >
                            <image
                              id="downward-arrow_1_"
                              data-name="downward-arrow (1)"
                              width="10"
                              height="6"
                              xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAaUlEQVQImX3OIRKCYBiE4QeGYLF4CE5AsGkgGb2AcjSG6gyQTAaiweMYnXG+8DsE5E27s2/YrDw0N+zwtswGnwIdhj9S4ppjRLUi1WhDDF7YL0gnPCIkMXjiOOtn3FOJj3MmXLBF/xvwBd5MDQUMYfROAAAAAElFTkSuQmCC"
                            />
                          </svg>
                        </div>
                        {dropOpen && (
                          <ul className="h__dropdown p-5 bg-white absolute flex-col inset-0 z-50 top-6 block w-80  rounded-tl-2xl rounded-br-3xl">
                            <li className="py-3">
                              <Link href="/vendor/onboard">
                                Vendor Registration
                              </Link>
                            </li>
                            <li className="py-3">
                              <Link href="/design-services">
                                Dee Ultra Subscription system
                              </Link>
                            </li>
                            <li className="py-3">
                              <a href=""> Design Download </a>
                            </li>
                            <li className="py-3">
                              <a href="">Creative AI Studio</a>
                            </li>
                            <li className="py-3">
                              <a href="">Event Connections</a>
                            </li>
                          </ul>
                        )}
                      </li>
                    </ul>
                  </div>
                  <Link href="/" className="em__logo">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="59px"
                      height="66px"
                    >
                      <image
                        x="0px"
                        y="0px"
                        width="59px"
                        height="66px"
                        xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAABCCAYAAADpCK66AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5wQeDA4XlplW2wAAF1RJREFUaN7te3d4nNWZ7+98bXrRjKQZlVGXJfeGYzAONtgJmEBCJ7lUmyxJ2CSELAmbQAjZsLskIfcSNrt4s4kum9AJEDAYHGMjbGMj25K7VSzJsrpGGk2f+eo5948ZGcuWZNmUvX/kfZ7zSM+n037nred9jwhjDGP0p1feBQCkZRWVpQWYP6cChBHIigpKGSRJgCSJeG/nARTke9E/NII/vrK5KpGUr4hE40vTiloLkHKASZQysFMnn4IUVUegIPefivy5v9YNYzpDzpn+vP4nECb6gyjySCsqNm7ZjZaOXlSU+GGSRESiSeTnuWExSc4Nm3euGBoJ3xWJJS/p6hnMSaUVyLICEAKzJMJkksBxBHabFYxRUDoxbgZgcHAYj3zvlsY7brockWj8UwELYGKwPM9D1XQ0NLVi0/a9+MLnF6Gmohivbdy+LJaUvxkPRZbHNK08KauQ0ypKivN3za0t27xgVlU7Y5QcPdZd0tE9UKvK6lW9fUOuwoI8CDwPTddBCBm3FgFgtZjRHxwV/vjnzZAV9VMB+o1bvjQxWMYYOELgtFtR5M+FxWzy7Npz5J/2HGj9utlsMjmddhCDQuQ4ec0Vy+5bdsHsp3c1HZWrygtBKUVH9wAWzq5CbWXx0re3NPx9e/fgrTkuB7FazdB1/Yz1OJ5DWlakcCQBRdM+U84SZKQLgsjDajFX/uWN+mdODIYurKwKwGISkUikYaha7J47rr7VYGzDaDgGVdORTMmglELTdPA8DwANq1cuadC2NvxlOBher2lantvtgKpq4zjMGAPHcUySBDBMS83Pi7jTgTLGIPA8bFYTRFHwHdzX/KdIMn1hbW0ZBI6AUobegWHMnVXxs/mzqjYEhyOgjIEyBnLaZIwxjIQiEATh1c8tmvlVJS0PJZIpmEwSCCEghIAjBMi2zA/yqbQJOUsIgSDwIByPzZsb/iMcT11UOaMUqqKC5zkEh0dR7M/tXrp41n+0dfaiIN8Ll9MKDmRCnvA8D0KAPK9765LFs9Zu+2D/RkXRIAgCGMvw0UikoCuqXdF0KOpnJ8aMgZF4Mo03/7rzxh37j143Y0YZ1KzRYAwIjkax5tLPPfvje74qt7T3wGoxwWGzIsflQGf3INwu28nJYvEUyop8+NatV0PXNPjyPW//+Bd197y55cMLyvO9w5QxAgAiIR6bzdJls5ghcPxnA5YxxjlsFjoYipi3fXjwofxcN0SBg6ZSAICu6/C4HZAV7dDvX3gbyZQCBgZJFNHdNwS3yw6R/2izBqUQRQFFfi8SiRR8XjecTttToiTAZBIx5oYFkwReECDwPAyBfmZgQTge3T2DX+wLjs6bVVsO5RRXYBgUVrOJUcrCm7Y1ZvQtO04UeBBCYLdZoKo6RFEEx3GglCKVVqCoGlKyAk3TAQZkg47MeEozIs0++vapgy0uzKMvvbkNf93W+BWPxwlKx58ypQyGwYz8PHfK63Eia7THrCl0Q0dPfxCVpYUIxxJQNQ30U9z86cQYywQvWX8yZn8mBOty2HHZxQuw8b3dRaIonuETOZ4AOvjB4KhdFHkwmjEwHCHQdAM2ixk8zyE/143K0gIMhSIQhYzIJlPpTxUopRSUMVjMpo8khjGoqgZgAmvM8wSzqkqWWExSVTyZxulMkUQRQ8OjRFXUObded+XG3oEgBEGAz+tCS3sPNr63BxWlBYhEEyj25yJgykO+141UUobLaT9DUj5JjiqqhtqqAEqLfFBUDWaThGAojOdfrz/pesb5WV030Nze88N4IlV5qqE5yVlC4HLYsf9Ix7ebjhxzgxG0tHdj174WOOxW0Kzu8TwHVdNhkgQQAL9c/xKaj52AJ8f5ieokIRnVkhUVM6tLMKMiAAZAFAVIYsbg6boBXTfOBCsrKqKxRMygDIQjZ0xuUIpcjxuhaDzwl43bH9OpgbbOXjQeOgaAnBH3UsrgctjQdrwXr236AKORGLSsLz297/kQpZmDrakMoLqiGIqqZcSZUhhZseY4Ao6bgLMZBaeeqRZQVBWlxT4c7xr8xvs7mh4r9OfCabdMyjHdMJDrcWJoJIJnX9uKJQtqUB7wI5VWkEims9dHOm3wjAECz2e5RmEYBqoriqDIKoyzqMk4nRUlERar2csRMqW4UcrgL8zDlu37Hij059ovXjbvh26nPTXZXZQxQBR4UMqwcHYFTJKAObUVWH7BHDz72hYMBkcRS6Tgdtigavqk6zLGwGetvqYb6BsYgdkkwdAz6nMyqJ8OWLPJhPJi/3NmSZyjGUbOVIuKAofC4nx09wz9PRoOL/Q6nQ/m5rjqOY5gsnPiOIKUrCAcTcDjdmDpopmwmCQ07G9Bkc8Lb44Tmj755Z2QjJF8491dMCiFy26F1WyatlSMA6tqGgSBXy+ZpJvkZOrSqQYaRkZkqioDGBgKLfvNH17ZvGhO1RO5Hue/u932LoHnJ5UOnuegKBpi8SSSaRm3XHsZREFAWlYx1b55gQdYxlCqBs3E8Oeg++PAJhMpvLmlAcmUPMiyk+n61GkSRVHhz/fAabcI7V3997cf77925dI564suyf2d22WLnU2PACAcTcButeBsKRmeUhCccls6RxpnoLr7g1hx4Tzccf2qV4MjYQiCMK1JVFWDKIrIz/fA5rRWvrV516/W1732Qf2uA7cW+XNhksRPNQw8L7BghFhMJqy5bOnG4oK8I739wxDF6QFmjEHTdFhMJlTWVmAgFJnzxxf/+qd//Of/endgKHRpXp4HPM/9j4IeB1YQePQNjiDP60rd/bU1j4z2Bamm6dPWC0IIKKVQFRU+nxdlpQXYd7h9VUNT88bG3Yd+zxhKPO5PNrA4b7CMMcbzHOKJFBbNr3mlemZ5Xduxbkgm6ZwnHtP1omIfAiV+88Hmzrse/7fnG55/fevX8/M8n0hQ8XHBAgDMJgkLZ1WyV/7ws3vLywu3H2vugMVixvlsT1N1gDKUzyhD0jD8v3v6jf9qPtD2n778HIfdav7U4uWzgj2VdMNAsS839ef1D19VXVq0qe1oe8a/TlOHx4gQgDIGVVHhzXEiUFoIg+LuZ158Z1fT4fbZBb7czwzwpGAZY+gPhlBW7IstXDp3jclseqK3dwjDoQhMFtN5LUYpBQNDoKoYnT3B2d958MnXu/sG5+d63Sf99v8IWCATg8YTKYRGwqysMnDfPWuvudUi8O09HT2gyIRuHHduws0Yg5xWUF0VAGWofPCRp14fDI6W+PNzMv6Tm7p9HF2ftkwOhyJYcdH8Zxmw6YOdBx480nr8awpjvuLCfNhsFqiqdk5WVlU1VFYUoaurv/SO7/3ypR/cc9OKRbMrlVR68ooAIYDdYgbHcdNe51Sa9iiB5zEyGgXHkZFcn/e+ZRfNv/K6Kz//x97+YdrR0QMjm28+l5NPp2QESgoQGhhZurW+8cdWqxmyqkLT9QmbompnjbKmxHAunQkh0HUD0VgClWVFTffcfvUdM6tLfrOnsfnbO/cc/mpK0y35eTlwOGzQNf3snCYEmqqitKoYOxuP/PDDvUdfLAn4j45G42eEg4wxSIIAt8OO85Xk85IHQgg0XUfHiT7MKC9u+ubar6x75Ad3rlg8t/rpcCSudnX2gec5THUZ+AgE4HTakdY081ubd33XbrPAabfCajGPazarGRzP4ePEI+M4a7WYkUhOPzHG8zyGhsMQBR4ej2vPfXdfv7bteP9TW9/b/cDOvUevy8nNgctpA52iZAkAmqqhNOBH49HOG3VNf3TZBbN7I9HERxwhBDo10DcQAmX0vAGPA9vVM4iiglxYz8G1EEJgUApFUTE4PIqaiqLdJUVXXV9c5LvxrS0ND5yIxBYHAn5wHIFh0AlF0GAMNqsFQ4Mhz4bNu67cfaD1d4lk+qT+a5qOXI8Lc2vL4bJbz5uz48T42Ve3wGyS0NrRC6vFBEkSwHFk2nW1MVcVjyeR5/O8vGL5wjWXXDj/v1uaj4NSClGYuLRBkKk2iCYJze09C2wWC3KcdrgcNrgcNjgdNuR73TAJwrgAZCy5ZzZJYIzBajEj1+uG22mHx+2A3WaZnLMOuxW6YaChoQXdfUHMmlGKmsoAdE1HKq1M29JSypBKyUim5OGHv3/bndWVxc1P/vvzj1XWVkAU+QlFmtJMckzV9Krbr1sNVdPAsv1EScCJ3iH0DozAI9lPjjGbTegdGMaOPYew+uKFeHNLw5In/vPlf3F7XTc4bNZooDAXoiicDFjOKH+IogCe59HVO4S+oRD6BkdQUuTDaCQOWVHPSV9kRUMoHMWvHvy7X8SiceHpFzc9Ont2JQyqnxlnMwZREhCOxWc3Hm7z6AYd/agkAgg8B0ka7zwEnoeiath3uB1FJQXY+Prmm+WRkZyFly1Nbt+5D7KqoKaiZGLOjgHmOAKLOZMxPNp2AmUBH4oKcuFxO6Dp+pTGBsjqsUGhGwZ0gyKVlvHoA+v++VDL8bmtx3tvLispzGbqT1kXAE84aKouDQRHXZTSUd2gsFpNcDsyBbOxnHA2aiOMMWazWvih4TD/xPqXLO/vbfnyV69f/f0Cr0vM9bhNAk+YqukKwIwJwZ6+abNJQjqtwGyWYLea8cVLFqOlvQeyrE4YKnIcQSyRAghgkkT0DYbQdLgdiqphwbzqh1s6e29KpWQiisKEbolREEOnnEEN8AKPgf4RaB4NVqsZvMBD13W3quk/BaAwxnpEkbcECvMSO/cenSdYrSneYvG3dfTcWV1eJCqKUuhyWDcB5L2zgj2dU7KiweW0YdHcasiyCkU5jTuMQdMNLJ5bhXm15dANA2lZxWAwDEKAu//Xl9q6e4Ze37b78DUVpQUwjPFgGTL1JLNF1MFE2B1W/OmZt7BgQQ3mza1Gx4l+5DjtJB5P7rRazQlFVWN2q1mrKC3of+HVd2+85dpVL91+7ernhiNRpyQJdGAg5I0mUpGx8PIcIyggGk+gIuDHkWPdGB6NZsoMAg9JFOGwWRAKxzG/thKptJLhvOuj8W6HHWUlBe9s33PkGl03xhk8QgBqUJgkMVno80ZEUUAskYZmGHA5bVhx4VykUjKiiWSY5/mXFVWDKAjI87oxGIqWyCmVCRz3h46egZTNYkrJlEJRtaBBDajZAt25XU4BcBwHRdUQiSUAEAi8gHAkjmAoirSs4ETvED5sbJ5QxLPggjkuOwxKIYyrJ2WiMqfTdmReTUX0yLETGAnHYDZJ0HQDgsDj4iWz0XjoGN7bsR9V5UW4fMUSXLBgBr73oyfvWPq52QdnziofEkUeZpMEVdezNScDLoft/MCOEc9nrneCwKO1swdlxT4MBEPQdAMu58SOn+MIdJ0aE9VsOULGitc9P3/yWZSW+OHLdXPBodDDqm40ptPKBoDh4gtmwSwJ+GDPUWzZ0YR3dzTZjx7rvujH3/3aA1++Yjl6+oM42HIcmmYgmVbgsFlRWuT7eGDHaKwAXBbwo2dgGM3tvTAoBT8BZyllcNitosDzZ7gejucy2Qy3s1sQedhsFrzz5rb/7fe67208eOzQN267aoPTbkM0noTP60LA78XMWZV44Y36z4sWUzxQUnho49bdGWsNgt37W9F+vBe3X/+FyV/LnA9xHIGm6di9vxW5HjfuuOELGBmNnhGEOB02bHh3lzWaSMFiGV9doZRB1Q3jtutWvVtdEcCLf9k6b8e+1nu/9KXlsAnCs3k5boRjcbz0xvuwSAJm15RheCSMlpbjdy2cW71xR8NBxBJJJFMKVi1bAIMakGX1pAR+YmDHSNcN8BzBFSsWYzQSz+rkRyLrdNjw1pYPZySTafA+70nXI4oCBodCKCnMa1w0b8ZenucggM1GWgkWFuavWFRT1sKYgZ7+IHoHRrBq2TzEE+nqHQ2H10LTXd+585qXD7Z0YDSSwIf7WrB8yRxIkghJEhBPpCFJ0plgMw8rLTBJIszZ9OlYZUyQRIiiAE2fvMrmy8vBtt2Hse7+X+OLlyxC2/G+zOBs0bjQ5+X3HmhdY7eZwRMC/eRzACA0GsMXLl7w9GBw1KguL8IN16zeun3LzsYNr71z+fJH/+GEy+lI53ncVofdsvhoa9fC4XAs32Q2HSivLkm0tnfHDxztRNOhDvjzPSefGphMEkbC0RmvvLN98arlC54fBzYUTdy19YP9YV3TyShlXBYsUzRNFAyDn1cdeMVmtaQnywYyxmCzmHGktQtLF9aCUsBkEhGPp5Cfl4PDLV0z2jp7F+TlumFkw0BR4DAUHEV+jqNt+bKFzx1q7gQ1KMrKioZuuP3L9/z3c2+tf+gXdRfMqyk9FE2khYqAjzve2dska9rvLXZrKplIPfRO/e6fi2bpmUgskRYlQRgZjeZIojgnEon7jnX2xOfWVhw+g7Oypj3526dft46FZmNECEBHwmg80vmVX/70mzfbrRY62aWcMQaLxZR9IjQEi0XCzOoAdIOirbPnbl3XeZvVDEXRwHMcKIDQwDB+cO8tDy2aVRk90TcEURQQCUdRUFjQlZPnuyIaiRTleV3sxbe2qfeu/Uq4yJ9ntHf3IRpPYs2lSx7fd7j966qqX3P9muWywWjqhQ31NFCQp1y5aunbDU3NbTd8+VLlDLA8ISjy555pgAgBKczHjsajN/zg0d+9vPbmK9ZazKbYVDGyzWrGrqZm5HnduPD2q/Hyhvcv+uv7jV+fUV0CWdYgiQJ0w0BrUytuuvnyx35y320vJ5MySovyoRs6+oNhpFNppGUZ/nxPX5EvF067FZSyk095s5GdnEwqv73z5i/ikqXzoBsGfvivf0BaVmA1m2CSxJMJidMNlD4RxwzGQFQNs2rL8GFT83WhkUjOFZd97u8KfJ6OWCw1IVhKGUySCF+eG6ORhPftrQ1PeXOcdo5k9D+VTuP44Q6sXn3h+u/cdd2PRiPxzIMwjL3bJCdtBqUMxiRPEcYuLvFkGqFwLNMva39OL5dOOweVfW+B2uoSDI6EL33xjfptr73zwfe8OQ6r2SzB6bBC4DN3VUIIHHYrXE4bYrHk/J88/n83j8ZT8wv8XqTTKvoHgujrC0a+e99t/3D/d2/51vBoBLI8/fvy+dI5uZ7MCzcNgYAPI+F44csb6v/PwSMdt5aV+N8oKcx/L62oBx12i8pxhG85dqJqJBS9eduu/XfqOvW7nHZ09Q7CLYgjs6tL3yoN+J+49vKL9yeTKajq9CuFnyTYsyZ4CCGQFQ05DhtcNguGR6OLewZGFm/ffehnnhxnt91ijvf0p6SfPP50pcDzXFlpEXJcdhR5Xa/FFG3rwpkVW8BxzbKsoKdvCG7n+adGPy7YQQDOswIGTiarPTlO8DxHKKWCLKuBUCRORJ5HWcAv53rc28oCvheWLqjtnD+r4v22jl70DAyj48QAGKXnndk/XyL/P5T/Pyv6bI/2b2D/BvZvYD8ukRkr1nIAfgMgBmAEwG9b6+vO+BeMmpXr3ADuB/DLbN91AGwA/m2SuVcB+AaAJgA7sg0A0Fpfd+q8ZgB7AdzeWl/XVLNy3cMAXmitr2ubaNKaletuBXAVABOATa31desn6efJ7tENgAfwOIcMdx0AngXw5ERAsxuMAPAAuDH76VIAH0xxkNUAurKHsWOKfjZkXOD9NSvXEWRSdJP6+9b6umcAbAXQNBnQLFUBuAvAr1vr637UWl8X4gBQACKAuwGswdT0IoA8ADOQ4W7TFH37ASwE8P3smMmoAMAjABqRkZy92T1NRQYAZaoOrfV1uwH8FMBTNSvX/WPNynXmMc6mAfyqtb7uzbNM8D4yIrEFwHNn2VAAGY7+HMDwFP0IgKWt9XW/BrAAwL9kD2oqsuEswU9WPV4FcBuAqwF8i8ueUgLAt7MnYDvLQl0A+jC1CAPAUQAzATwEYPUU/VIAgtnf/xVAOPttKhoA0HOWPhYAj2XX3wVgE2GMoWblOhFAKTK6095aX6dPNUvNynWYJuUByAUQOgXQOAM1yfzC2fYwHapZuY4DMA/A4db6Ov3/Ab3tGDeJ/7m8AAAAAElFTkSuQmCC"
                      />
                    </svg>
                  </Link>
                  <div className="em__left">
                    <ul>
                      {status === "unauthenticated" && (
                        <li>
                          <Link href="/auth/signin">Login</Link>
                        </li>
                      )}

                      <li>
                        <Link href="/backdrops">Contact Set</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="em__search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <image
                      id="search_19_"
                      data-name="search (19)"
                      width="16"
                      height="16"
                      xlinkHref="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABXklEQVQ4jZXTP0iWURQG8F8aH0G6BFEgERZ+YRIEuTkYDk2JtfQNtji4tDjUFIKFYNDQqCAONRcY2NIQTk4OhVKhorkU2ByEORRXzgv3e99PoQcu73vvec5z7p/znKgPjilhFOMYzJZXsICXZfLJ7P8CFnEj5lv4gXMYiPEIdyN2iLb4JtLnSH6BLtRxE704j2fowxdcLAt8QCfu4WFUzrGHxxiOXS/nAndCeRavy2cs4V3spBv3Uyhd4ir6cQr7lZTW+IsdXG6L5O3/SE5YwyXUijvYqFCOx9eIdhQCPcfSq7gSK7+SwMcQqFVoR+M6vuFPEpgJ2vMj6c14ErOn4hnfYBMTGKnQm3ELU9E3r2SNNBSv8BbTOFtKPINJvI/5zyJQeOE7rmIpiGmsZ15IZ05IptoNw7WjkZspNUbqyGTPB9Ef1yL2CXOYzwo30s5a2blAqnAav3HQIr6E2/8A1Sc9vrJ55XYAAAAASUVORK5CYII="
                    />
                  </svg>
                </div>

                <div className="bar mt-3" onClick={() => setOpen(!open)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={32}
                    height={32}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="feather feather-menu"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {open && (
            <div className="mobile__menu">
              <ul>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Event Essentials</a>
                </li>
                <li>
                  <Link href="/designs">Designs and prints</Link>
                </li>
                <li>
                  <Link href="/backdrops">Contact Set</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
