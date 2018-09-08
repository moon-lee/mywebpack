import { dom, library } from "@fortawesome/fontawesome-svg-core";
import { faCloud } from "@fortawesome/free-solid-svg-icons/faCloud";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faTable } from "@fortawesome/free-solid-svg-icons/faTable";
import { faTachometerAlt } from "@fortawesome/free-solid-svg-icons/faTachometerAlt";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faGooglePlusSquare } from "@fortawesome/free-brands-svg-icons/faGooglePlusSquare";

library.add(faCloud, faTable, faBars, faTachometerAlt, faSignOutAlt, faGooglePlusSquare, faChevronLeft, faChevronRight);

dom.i2svg();