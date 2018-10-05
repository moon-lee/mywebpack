import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { faCloud } from "@fortawesome/free-solid-svg-icons/faCloud";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faTable } from "@fortawesome/free-solid-svg-icons/faTable";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons/faTachometerAlt";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faWeight } from "@fortawesome/free-solid-svg-icons/faWeight";
import { faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons/faMoneyCheckAlt";
import { faGooglePlusSquare } from "@fortawesome/free-brands-svg-icons/faGooglePlusSquare";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons/faPlusSquare";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons/faMinusSquare";


export function init_fonts() {
    library.add(faCloud, faTable, faBars, faTachometerAlt, faSignOutAlt, faGooglePlusSquare, faWeight, faMoneyCheckAlt);
    library.add(faPlusSquare, faMinusSquare);
    dom.i2svg();
}
